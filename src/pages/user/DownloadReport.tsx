import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import RadarChart from '../../components/RadarChart';
import SkillMap from '../../components/SkillMap';
import { Download, ArrowLeft, Calendar } from 'lucide-react';

const mockRoles = [
  { title: 'Senior Frontend Developer', matchScore: 92, department: 'Engineering' },
  { title: 'Product Manager', matchScore: 85, department: 'Product' },
  { title: 'UX Designer', matchScore: 78, department: 'Design' },
];

export default function DownloadReport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            onClick={() => navigate('/ai-analysis')}
            variant="outline"
            className="rounded-xl border-slate-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Back
          </Button>
          <Button
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
          >
            <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Download PDF
          </Button>
        </div>

        {/* Report Preview */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 border-8 border-slate-100">
          {/* Cover */}
          <div className="text-center mb-12 pb-12 border-b border-slate-200">
            <h1 className="mb-4">Career Development Report</h1>
            <p className="text-slate-500 mb-6">AI-Powered Career Path Analysis</p>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-50 border border-purple-100">
              <Calendar className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
              <span className="text-sm text-purple-700">Generated: November 14, 2025</span>
            </div>
          </div>

          {/* Charts Section */}
          <div className="mb-12">
            <h2 className="mb-6">Skills Analysis</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="mb-4 text-center">Skills Overview</h3>
                <div className="h-64">
                  <RadarChart />
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="mb-4 text-center">Skill Connections</h3>
                <div className="h-64">
                  <SkillMap />
                </div>
              </div>
            </div>
          </div>

          {/* Personality Profile */}
          <div className="mb-12">
            <h2 className="mb-6">Strength Profile Summary</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
                <h4 className="mb-2">Personality Pattern</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Based on the Big Five framework, you exhibit high openness to experience and conscientiousness. You're naturally curious, organized, and detail-oriented.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <h4 className="mb-2">Top Advantage</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Your unique combination of technical expertise and strong communication skills sets you apart in cross-functional roles.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-pink-50 border border-pink-100">
                <h4 className="mb-2">Natural Tendencies</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  You thrive in environments that offer both structure and autonomy, preferring meaningful work with clear goals.
                </p>
              </div>
            </div>
          </div>

          {/* Recommended Roles */}
          <div className="mb-12">
            <h2 className="mb-6">Top Career Recommendations</h2>
            <div className="space-y-4">
              {mockRoles.map((role, index) => (
                <div key={index} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">{role.department}</p>
                    <h3>{role.title}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-500 mb-1">Match Score</p>
                    <span className="text-purple-700">{role.matchScore}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 60-Day Plan */}
          <div>
            <h2 className="mb-6">60-Day Action Plan</h2>
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-green-50 border border-green-100">
                <h4 className="mb-2">Days 1-20: Skill Development</h4>
                <p className="text-sm text-slate-600">
                  Focus on closing skill gaps. Complete online courses in Node.js and GraphQL. Build a small project to demonstrate proficiency.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <h4 className="mb-2">Days 21-40: Portfolio Enhancement</h4>
                <p className="text-sm text-slate-600">
                  Update your portfolio with recent projects. Write technical blog posts to showcase expertise. Contribute to open-source projects.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-purple-50 border border-purple-100">
                <h4 className="mb-2">Days 41-60: Networking & Applications</h4>
                <p className="text-sm text-slate-600">
                  Connect with professionals in target roles. Apply to recommended positions. Prepare for interviews with mock sessions.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-12 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>This report is generated by Career Path Finder AI</p>
            <p>Use as guidance only. Not a definitive assessment.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
