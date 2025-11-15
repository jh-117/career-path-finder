import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const data = [
  { skill: 'Technical', value: 90 },
  { skill: 'Communication', value: 85 },
  { skill: 'Leadership', value: 75 },
  { skill: 'Problem Solving', value: 88 },
  { skill: 'Creativity', value: 82 },
  { skill: 'Analytics', value: 78 },
];

export default function RadarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart data={data}>
        <PolarGrid 
          stroke="#e0e7ff" 
          strokeWidth={1.5}
        />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: '#64748b', fontSize: 13 }}
          stroke="#cbd5e1"
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]} 
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          stroke="#cbd5e1"
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="#8b5cf6"
          fill="url(#colorGradient)"
          fillOpacity={0.6}
          strokeWidth={2.5}
        />
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
