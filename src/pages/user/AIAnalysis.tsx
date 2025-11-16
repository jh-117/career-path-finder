import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import RadarChart from '../../components/RadarChart';
import SkillMap from '../../components/SkillMap';
import RoleCard from '../../components/RoleCard';
import { Info, Download, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';

interface AnalysisData {
  personalityPattern: string;
  topAdvantage: string;
  naturalTendencies: string;
  skillsRadar: {
    technical: number;
    communication: number;
    leadership: number;
    creativity: number;
    problemSolving: number;
    adaptability: number;
  };
  recommendedRoles: Array<{
    title: string;
    matchScore: number;
    skills: string[];
    department: string;
    reasoning: string;
  }>;
}

export default function AIAnalysis() {
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  const fetchAnalysis = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
        return;
      }

      const { data, error } = await supabase
        .from('ai_analyses')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setAnalysis(data.analysis_data);
      }
    } catch (error) {
      console.error('Error fetching analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return (
      <div className="min-h-screen py-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 mb-4">No analysis found. Please complete the strength discovery first.</p>
          <Button onClick={() => navigate('/strength-discovery')}>
            Go to Strength Discovery
          </Button>
        </div>
      </div>
    );
  }

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
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <h2 className="mb-6">Skills Overview</h2>
          <div className="h-96 flex items-center justify-center">
            <RadarChart data={analysis.skillsRadar} />
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-10 border border-white">
          <h2 className="mb-8">Your Strength Profile</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 border border-purple-100/50">
              <h3 className="mb-3 text-purple-700">Personality Pattern</h3>
              <p className="text-slate-600 leading-relaxed">
                {analysis.personalityPattern}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100/50">
              <h3 className="mb-3 text-blue-700">Your Top Advantage</h3>
              <p className="text-slate-600 leading-relaxed">
                {analysis.topAdvantage}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-50/80 to-purple-50/80 border border-pink-100/50">
              <h3 className="mb-3 text-pink-700">Natural Tendencies</h3>
              <p className="text-slate-600 leading-relaxed">
                {analysis.naturalTendencies}
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Roles */}
        <div>
          <h2 className="mb-8">Recommended Career Paths</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {analysis.recommendedRoles.map((role, index) => (
              <RoleCard
                key={index}
                role={{
                  id: String(index + 1),
                  title: role.title,
                  matchScore: role.matchScore,
                  skills: role.skills,
                  department: role.department,
                  deadline: ''
                }}
                onClick={() => navigate(`/role/${index + 1}`)}
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