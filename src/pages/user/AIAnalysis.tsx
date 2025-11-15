import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import RadarChart from '../../components/RadarChart';
import SkillMap from '../../components/SkillMap';
import RoleCard from '../../components/RoleCard';
import { Info, Download, ArrowLeft } from 'lucide-react';

const mockRoles = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    matchScore: 92,
    skills: ['React', 'TypeScript', 'UI/UX', 'Problem Solving'],
    department: 'Engineering',
    deadline: '2025-12-01'
  },
  {
    id: '2',
    title: 'Product Manager',
    matchScore: 85,
    skills: ['Leadership', 'Communication', 'Strategy', 'Analytics'],
    department: 'Product',
    deadline: '2025-11-28'
  },
  {
    id: '3',
    title: 'UX Designer',
    matchScore: 78,
    skills: ['Design', 'User Research', 'Creativity', 'Collaboration'],
    department: 'Design',
    deadline: '2025-12-05'
  },
];

export default function AIAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="mb-3">Your AI Career Analysis</h1>
          <p className="text-slate-500">Personalized insights based on your unique profile</p>
        </div>

        {/* Disclosure */}
        <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Info className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-600 leading-relaxed">
                This analysis is generated using AI based on the information you provided, including your selected skills, career interests, personal responses, and supporting documents such as your resume. The interpretation of strengths uses the <span className="font-medium">Big Five Personality Traits framework</span> combined with skill-based profiling methods commonly applied in career development. This result should be used as guidance only and does not represent a definitive assessment of your abilities, personality, or job suitability.
              </p>
            </div>
          </div>
        </div>

        {/* Visual Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Skills Overview</h2>
            <div className="h-80 flex items-center justify-center">
              <RadarChart />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Skill Connections</h2>
            <div className="h-80 flex items-center justify-center">
              <SkillMap />
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-10 border border-white">
          <h2 className="mb-8">Your Strength Profile</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 border border-purple-100/50">
              <h3 className="mb-3 text-purple-700">Personality Pattern</h3>
              <p className="text-slate-600 leading-relaxed">
                Based on the Big Five framework, you exhibit high openness to experience and conscientiousness. You're naturally curious, organized, and detail-oriented—traits that make you excellent at both creative problem-solving and systematic execution.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100/50">
              <h3 className="mb-3 text-blue-700">Your Top Advantage</h3>
              <p className="text-slate-600 leading-relaxed">
                Your unique combination of technical expertise and strong communication skills sets you apart. You can bridge the gap between technical teams and stakeholders, making you valuable in cross-functional roles.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50/80 to-purple-50/80 border border-pink-100/50">
              <h3 className="mb-3 text-pink-700">Natural Tendencies</h3>
              <p className="text-slate-600 leading-relaxed">
                You thrive in environments that offer both structure and autonomy. You prefer meaningful work with clear goals but appreciate the freedom to innovate within those parameters. Collaborative projects energize you, especially when you can contribute both ideas and execution.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Roles */}
        <div>
          <h2 className="mb-8">Recommended Career Paths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <div className="flex justify-center gap-4 pt-6">
          <Button
            onClick={() => navigate('/strength-discovery')}
            variant="outline"
            className="h-12 px-6 rounded-xl border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Back
          </Button>
          <Button
            onClick={() => navigate('/download-report')}
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
          >
            <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}
