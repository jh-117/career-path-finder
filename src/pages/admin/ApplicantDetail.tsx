import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import RadarChart from '../../components/RadarChart';
import SkillMap from '../../components/SkillMap';
import { ArrowLeft, Mail, Phone, MapPin, FileText, Download, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';

const mockApplicant = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah.johnson@email.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  avatar: 'SJ',
  matchScore: 92,
  appliedDate: '2025-11-10',
  appliedFor: 'Senior Frontend Developer',
  summary: 'Experienced frontend developer with 6+ years of expertise in React, TypeScript, and modern web technologies. Passionate about creating intuitive user experiences and mentoring junior developers.',
  documents: ['Resume_Sarah_Johnson.pdf', 'Portfolio_2025.pdf', 'Certifications.pdf'],
  technicalSkills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'Testing'],
  softSkills: ['Leadership', 'Communication', 'Problem Solving', 'Collaboration'],
  requiredSkills: [
    { name: 'React', match: true },
    { name: 'TypeScript', match: true },
    { name: 'Node.js', match: true },
    { name: 'GraphQL', match: true },
    { name: 'Testing (Jest/Cypress)', match: true },
    { name: 'CI/CD', match: false }
  ],
  aiInsights: {
    personality: 'Shows high conscientiousness and openness to experience. Strong collaborative tendencies with excellent communication skills. Natural leader who can bridge technical and non-technical teams.',
    topAdvantage: 'Exceptional combination of deep technical expertise and strong leadership abilities. Has demonstrated success in mentoring teams and delivering complex projects.',
    fitExplanation: 'Sarah is an excellent match for this senior role. Her technical skills align perfectly with requirements, and her leadership experience makes her ideal for mentoring junior developers. The only gap is formal CI/CD certification, which can be addressed through on-the-job training.'
  }
};

export default function ApplicantDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const matchingSkills = mockApplicant.requiredSkills.filter(s => s.match).length;
  const totalSkills = mockApplicant.requiredSkills.length;

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/admin/role/1')}
          variant="outline"
          className="rounded-xl border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back to Role
        </Button>

        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-10 border border-white">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
                <span className="text-2xl">{mockApplicant.avatar}</span>
              </div>
              <div>
                <h1 className="mb-2">{mockApplicant.name}</h1>
                <p className="text-slate-500 mb-3">Applied for {mockApplicant.appliedFor}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Mail className="w-4 h-4" strokeWidth={1.5} />
                    <span>{mockApplicant.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Phone className="w-4 h-4" strokeWidth={1.5} />
                    <span>{mockApplicant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" strokeWidth={1.5} />
                    <span>{mockApplicant.location}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                <span className="text-2xl bg-gradient-to-br from-green-500 to-emerald-500 bg-clip-text text-transparent">
                  {mockApplicant.matchScore}%
                </span>
              </div>
              <p className="text-sm text-slate-500">Match Score</p>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            {mockApplicant.summary}
          </p>

          <div className="flex gap-3">
            <Button className="h-11 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
              <MessageCircle className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Connect With Applicant
            </Button>
            <Button variant="outline" className="h-11 px-6 rounded-xl border-slate-200">
              <Download className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Download Report
            </Button>
          </div>
        </div>

        {/* Uploaded Documents */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <h2 className="mb-6">Uploaded Documents</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {mockApplicant.documents.map((doc, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-purple-200 cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-900 truncate">{doc}</p>
                  <p className="text-xs text-slate-400">PDF Document</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Match Breakdown */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <div className="flex items-center justify-between mb-6">
            <h2>Skill Match Breakdown</h2>
            <div className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-100">
              <span className="text-sm text-purple-700">
                {matchingSkills}/{totalSkills} skills matched
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {mockApplicant.requiredSkills.map((skill, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-xl border ${
                  skill.match
                    ? 'bg-green-50/50 border-green-200'
                    : 'bg-orange-50/50 border-orange-200'
                }`}
              >
                <span className="text-slate-900">{skill.name}</span>
                {skill.match ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" strokeWidth={1.5} />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-600" strokeWidth={1.5} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Visual Analytics */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Skills Radar</h2>
            <div className="h-80 flex items-center justify-center">
              <RadarChart />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Strength Map</h2>
            <div className="h-80 flex items-center justify-center">
              <SkillMap />
            </div>
          </div>
        </div>

        {/* AI Summary */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <h2 className="mb-6">AI-Generated Insights</h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 border border-purple-100/50">
              <h3 className="mb-3 text-purple-700">Personality Profile</h3>
              <p className="text-slate-600 leading-relaxed">
                {mockApplicant.aiInsights.personality}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100/50">
              <h3 className="mb-3 text-blue-700">Top Advantage</h3>
              <p className="text-slate-600 leading-relaxed">
                {mockApplicant.aiInsights.topAdvantage}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50/80 to-emerald-50/80 border border-green-100/50">
              <h3 className="mb-3 text-green-700">Fit-to-Role Explanation</h3>
              <p className="text-slate-600 leading-relaxed">
                {mockApplicant.aiInsights.fitExplanation}
              </p>
            </div>
          </div>
        </div>

        {/* Skills Lists */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Technical Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {mockApplicant.technicalSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-100/80 to-blue-100/80 text-purple-700 border border-purple-200/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Soft Skills</h2>
            <div className="flex flex-wrap gap-2.5">
              {mockApplicant.softSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-100/80 to-cyan-100/80 text-blue-700 border border-blue-200/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
