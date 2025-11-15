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
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadarChart data={data}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis dataKey="skill" tick={{ fill: '#64748b', fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
