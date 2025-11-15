import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import ApplicantCard from '../../components/ApplicantCard';
import { ArrowLeft, Calendar, Clock, Users, FileText, Briefcase } from 'lucide-react';

const mockRole = {
  id: '1',
  title: 'Senior Frontend Developer',
  department: 'Engineering',
  description: 'Lead the development of user-facing features and mentor junior developers in modern frontend technologies.',
  technicalSkills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
  softSkills: ['Leadership', 'Communication', 'Problem Solving'],
  startDate: '2025-12-01',
  endDate: '2026-12-01',
  deadline: '2025-11-30',
  daysLeft: 16,
  documents: ['Job_Description.pdf', 'Team_Structure.pdf']
};

const mockApplicants = [
  {
    id: '1',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    matchScore: 92,
    skills: ['React', 'TypeScript', 'UI/UX', 'Problem Solving'],
    appliedDate: '2025-11-10'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'MC',
    matchScore: 88,
    skills: ['React', 'Node.js', 'Leadership', 'GraphQL'],
    appliedDate: '2025-11-11'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    avatar: 'ER',
    matchScore: 85,
    skills: ['TypeScript', 'React', 'Communication', 'Testing'],
    appliedDate: '2025-11-12'
  },
  {
    id: '4',
    name: 'David Kim',
    avatar: 'DK',
    matchScore: 82,
    skills: ['React', 'JavaScript', 'UI/UX', 'Agile'],
    appliedDate: '2025-11-13'
  },
];

export default function AdminRoleDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/admin/manage-roles')}
          variant="outline"
          className="rounded-xl border-slate-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" strokeWidth={1.5} />
          Back to Roles
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Role Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Role Header */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
              <p className="text-sm text-slate-500 mb-2">{mockRole.department}</p>
              <h1 className="mb-6">{mockRole.title}</h1>
              
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
                    <p className="text-xs text-slate-500">Applicants</p>
                  </div>
                  <p className="text-purple-700">{mockApplicants.length}</p>
                </div>

                <div className="p-4 rounded-xl bg-orange-50 border border-orange-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-600" strokeWidth={1.5} />
                    <p className="text-xs text-slate-500">Deadline</p>
                  </div>
                  <p className="text-orange-700">{mockRole.daysLeft} days left</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {new Date(mockRole.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-blue-600" strokeWidth={1.5} />
                    <p className="text-xs text-slate-500">Duration</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    {new Date(mockRole.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    {' → '}
                    {new Date(mockRole.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-indigo-600" strokeWidth={1.5} />
                <h3>Description</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {mockRole.description}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
              <h3 className="mb-4">Required Skills</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-500 mb-2">Technical</p>
                  <div className="flex flex-wrap gap-2">
                    {mockRole.technicalSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-2">Soft Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {mockRole.softSkills.map((skill, index) => (
                      <span key={index} className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-indigo-600" strokeWidth={1.5} />
                <h3>Documents</h3>
              </div>
              <div className="space-y-2">
                {mockRole.documents.map((doc, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <FileText className="w-4 h-4 text-purple-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm text-slate-700">{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Applicants */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
              <div className="flex items-center justify-between mb-8">
                <h2>Applicants ({mockApplicants.length})</h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="rounded-xl border-slate-200">
                    Sort by Match
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {mockApplicants.map((applicant) => (
                  <ApplicantCard
                    key={applicant.id}
                    applicant={applicant}
                    onClick={() => navigate(`/admin/applicant/${applicant.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
