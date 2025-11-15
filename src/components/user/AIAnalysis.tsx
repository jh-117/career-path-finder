import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import RadarChart from '../shared/RadarChart';
import SkillMap from '../shared/SkillMap';
import RoleCard from '../shared/RoleCard';
import { Info, ArrowRight, Download } from 'lucide-react';

const mockRoles = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    matchScore: 92,
    skills: ['React', 'TypeScript', 'UI/UX', 'Problem Solving'],
    department: 'Engineering',
  },
  {
    id: '2',
    title: 'Product Manager',
    matchScore: 85,
    skills: ['Leadership', 'Communication', 'Strategy', 'Analytics'],
    department: 'Product',
  },
  {
    id: '3',
    title: 'UX Designer',
    matchScore: 78,
    skills: ['Design', 'User Research', 'Creativity', 'Collaboration'],
    department: 'Design',
  },
];

export default function AIAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-2">Your AI Career Analysis</h1>
          <p className="text-slate-500">Personalized insights based on your unique profile</p>
        </div>

        {/* Disclosure */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-slate-600 leading-relaxed">
              This analysis is generated using AI based on the information you provided, including your selected skills, career interests, personal responses, and supporting documents such as your resume. The interpretation of strengths uses the Big Five Personality Traits framework combined with skill-based profiling methods commonly applied in career development. This result should be used as guidance only and does not represent a definitive assessment of your abilities, personality, or job suitability.
            </p>
          </div>
        </div>

        {/* Visual Analytics */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <h2 className="mb-6">Skills Overview</h2>
            <RadarChart />
          </div>

          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <h2 className="mb-6">Skill Connections</h2>
            <SkillMap />
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
          <h2 className="mb-6">Your Strength Profile</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <h3 className="mb-3 text-purple-700">Personality Pattern</h3>
              <p className="text-slate-600 leading-relaxed">
                Based on the Big Five framework, you exhibit high openness to experience and conscientiousness. You're naturally curious, organized, and detail-oriented—traits that make you excellent at both creative problem-solving and systematic execution.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-blue-50/50 to-purple-50/50">
              <h3 className="mb-3 text-blue-700">Your Top Advantage</h3>
              <p className="text-slate-600 leading-relaxed">
                Your unique combination of technical expertise and strong communication skills sets you apart. You can bridge the gap between technical teams and stakeholders, making you valuable in cross-functional roles.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-gradient-to-r from-purple-50/50 to-pink-50/50">
              <h3 className="mb-3 text-purple-700">Natural Tendencies</h3>
              <p className="text-slate-600 leading-relaxed">
                You thrive in environments that offer both structure and autonomy. You prefer meaningful work with clear goals but appreciate the freedom to innovate within those parameters. Collaborative projects energize you, especially when you can contribute both ideas and execution.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Roles */}
        <div>
          <h2 className="mb-6">Recommended Career Paths</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {mockRoles.map((role) => (
              <RoleCard
                key={role.id}
                role={role}
                onClick={() => navigate(`/role/${role.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate('/downloadable-report')}
            variant="outline"
            className="rounded-xl border-slate-200"
          >
            <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}
