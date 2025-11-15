import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { ArrowLeft, Briefcase, TrendingUp, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { useState } from 'react';

const mockRole = {
  id: '1',
  title: 'Senior Frontend Developer',
  matchScore: 92,
  department: 'Engineering',
  futureGrowth: 'High demand in next 5 years',
  description: 'Lead the development of user-facing features and mentor junior developers in modern frontend technologies.',
  responsibilities: [
    'Design and implement complex React applications',
    'Mentor junior developers and conduct code reviews',
    'Collaborate with design and product teams',
    'Optimize application performance and scalability'
  ],
  requiredSkills: [
    { name: 'React', match: true },
    { name: 'TypeScript', match: true },
    { name: 'Node.js', match: false },
    { name: 'GraphQL', match: false },
    { name: 'Testing (Jest/Cypress)', match: true },
    { name: 'CI/CD', match: false }
  ],
  futurePath: [
    { role: 'Senior Frontend Developer', years: 'Now' },
    { role: 'Lead Frontend Engineer', years: '2-3 years' },
    { role: 'Engineering Manager', years: '4-5 years' },
    { role: 'Director of Engineering', years: '6+ years' }
  ],
  documents: ['Job_Description.pdf', 'Team_Structure.pdf']
};

export default function RoleDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  const matchingSkills = mockRole.requiredSkills.filter(s => s.match).length;
  const totalSkills = mockRole.requiredSkills.length;

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/ai-analysis')}
          variant="outline"
          className="rounded-xl border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back to Analysis
        </Button>

        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-10 border border-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm text-slate-500 mb-2">{mockRole.department}</p>
              <h1 className="mb-3">{mockRole.title}</h1>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
                    <span className="bg-gradient-to-br from-green-500 to-emerald-500 bg-clip-text text-transparent">
                      {mockRole.matchScore}%
                    </span>
                  </div>
                  <span className="text-sm text-slate-600">Match Score</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 border border-blue-100">
                  <TrendingUp className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                  <span className="text-sm text-blue-700">{mockRole.futureGrowth}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed">
            {mockRole.description}
          </p>
        </div>

        {/* Key Responsibilities */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <h2 className="mb-6">Key Responsibilities</h2>
          <div className="space-y-3">
            {mockRole.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50/50">
                <div className="w-6 h-6 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Briefcase className="w-3.5 h-3.5 text-purple-600" strokeWidth={1.5} />
                </div>
                <p className="text-slate-700">{responsibility}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Match */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <div className="flex items-center justify-between mb-6">
            <h2>Required Skills</h2>
            <div className="px-4 py-2 rounded-xl bg-purple-50 border border-purple-100">
              <span className="text-sm text-purple-700">
                {matchingSkills}/{totalSkills} skills matched
              </span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {mockRole.requiredSkills.map((skill, index) => (
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
          
          {mockRole.requiredSkills.some(s => !s.match) && (
            <div className="mt-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Gap Skills:</span> Consider developing {mockRole.requiredSkills.filter(s => !s.match).map(s => s.name).join(', ')} to strengthen your application.
              </p>
            </div>
          )}
        </div>

        {/* Future Path */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <h2 className="mb-6">Career Progression Path</h2>
          <div className="relative">
            <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-indigo-500"></div>
            <div className="space-y-6">
              {mockRole.futurePath.map((step, index) => (
                <div key={index} className="flex items-start gap-4 relative">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 z-10 ${
                    index === 0
                      ? 'bg-gradient-to-br from-purple-500 to-blue-500'
                      : 'bg-white border-2 border-purple-300'
                  }`}>
                    <span className={`text-sm ${index === 0 ? 'text-white' : 'text-purple-700'}`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className={index === 0 ? 'text-purple-700' : 'text-slate-900'}>{step.role}</h3>
                    <p className="text-sm text-slate-500">{step.years}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <h2 className="mb-6">Supporting Documents</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {mockRole.documents.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
                </div>
                <span className="text-slate-700">{doc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <div className="flex justify-center">
          <Button
            onClick={() => setShowApplyDialog(true)}
            className="h-14 px-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
          >
            Apply for This Role
          </Button>
        </div>

        {/* Apply Dialog */}
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" strokeWidth={1.5} />
                </div>
              </div>
              <DialogTitle className="text-center">Application Submitted!</DialogTitle>
              <DialogDescription className="text-center">
                Your application for {mockRole.title} has been submitted successfully. The hiring team will review your profile and contact you soon.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => setShowApplyDialog(false)}
                variant="outline"
                className="flex-1 rounded-xl"
              >
                Close
              </Button>
              <Button
                onClick={() => navigate('/ai-analysis')}
                className="flex-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600"
              >
                View More Roles
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
