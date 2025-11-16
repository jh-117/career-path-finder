import { useState } from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarChartProps {
  data?: {
    technical: number;
    communication: number;
    leadership: number;
    creativity: number;
    problemSolving: number;
    adaptability: number;
  };
}

const getChartData = (skillsData?: RadarChartProps['data']) => {
  if (!skillsData) {
    return [
      {
        skill: 'Technical',
        fullSkill: 'Technical Skills',
        value: 90,
        description: 'Proficiency in programming, tools, and technical problem-solving'
      },
      {
        skill: 'Communication',
        fullSkill: 'Communication Skills',
        value: 85,
        description: 'Ability to convey ideas clearly and collaborate effectively'
      },
      {
        skill: 'Leadership',
        fullSkill: 'Leadership Skills',
        value: 75,
        description: 'Capacity to guide teams and make strategic decisions'
      },
      {
        skill: 'Problem Solving',
        fullSkill: 'Problem Solving',
        value: 88,
        description: 'Analytical thinking and creative solution development'
      },
      {
        skill: 'Creativity',
        fullSkill: 'Creativity & Innovation',
        value: 82,
        description: 'Original thinking and ability to generate new ideas'
      },
      {
        skill: 'Adaptability',
        fullSkill: 'Adaptability',
        value: 78,
        description: 'Flexibility and ability to adjust to changing circumstances'
      },
    ];
  }

  return [
    {
      skill: 'Technical',
      fullSkill: 'Technical Skills',
      value: skillsData.technical,
      description: 'Proficiency in programming, tools, and technical problem-solving'
    },
    {
      skill: 'Communication',
      fullSkill: 'Communication Skills',
      value: skillsData.communication,
      description: 'Ability to convey ideas clearly and collaborate effectively'
    },
    {
      skill: 'Leadership',
      fullSkill: 'Leadership Skills',
      value: skillsData.leadership,
      description: 'Capacity to guide teams and make strategic decisions'
    },
    {
      skill: 'Problem Solving',
      fullSkill: 'Problem Solving',
      value: skillsData.problemSolving,
      description: 'Analytical thinking and creative solution development'
    },
    {
      skill: 'Creativity',
      fullSkill: 'Creativity & Innovation',
      value: skillsData.creativity,
      description: 'Original thinking and ability to generate new ideas'
    },
    {
      skill: 'Adaptability',
      fullSkill: 'Adaptability',
      value: skillsData.adaptability,
      description: 'Flexibility and ability to adjust to changing circumstances'
    },
  ];
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-purple-200 rounded-xl p-4 shadow-xl shadow-purple-500/20 max-w-xs">
        <h4 className="text-slate-900 mb-2">{data.fullSkill}</h4>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {data.value}%
          </span>
          <span className="text-xs text-slate-500">match score</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          {data.description}
        </p>
      </div>
    );
  }
  return null;
};

// Custom label component with better positioning
const CustomLabel = ({ x, y, value, index, payload }: any) => {
  const skill = payload.skill;
  
  // Calculate angle for better positioning
  const angleStep = (2 * Math.PI) / 6;
  const angle = angleStep * index - Math.PI / 2;
  
  // Adjust distance from center based on position
  const distance = 15;
  const adjustedX = x + Math.cos(angle) * distance;
  const adjustedY = y + Math.sin(angle) * distance;
  
  // Text anchor based on position
  let textAnchor: 'start' | 'middle' | 'end' = 'middle';
  if (adjustedX > x + 5) textAnchor = 'start';
  else if (adjustedX < x - 5) textAnchor = 'end';
  
  return (
    <text
      x={adjustedX}
      y={adjustedY}
      textAnchor={textAnchor}
      fill="#475569"
      fontSize="13"
      fontWeight="500"
      className="select-none"
    >
      {skill}
    </text>
  );
};

export default function RadarChart({ data: skillsData }: RadarChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const data = getChartData(skillsData);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart
        data={data}
        onMouseMove={(state: any) => {
          if (state.isTooltipActive) {
            setActiveIndex(state.activeTooltipIndex);
          }
        }}
        onMouseLeave={() => setActiveIndex(null)}
      >
        <PolarGrid 
          stroke="#e0e7ff" 
          strokeWidth={1.5}
        />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={CustomLabel}
          stroke="#cbd5e1"
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          stroke="#cbd5e1"
          tickCount={6}
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="#8b5cf6"
          fill="url(#colorGradient)"
          fillOpacity={activeIndex !== null ? 0.8 : 0.6}
          strokeWidth={2.5}
          activeDot={{ 
            r: 8, 
            fill: '#8b5cf6',
            stroke: '#fff',
            strokeWidth: 3,
          }}
          dot={{
            r: 5,
            fill: '#8b5cf6',
            stroke: '#fff',
            strokeWidth: 2,
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.8}/>
            <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.4}/>
          </linearGradient>
        </defs>
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
