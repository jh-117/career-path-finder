import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Plus, Users, Calendar, Clock, Sparkles, ArrowRight } from 'lucide-react';

const mockRoles = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    startDate: '2025-12-01',
    endDate: '2026-12-01',
    deadline: '2025-11-30',
    applicants: 24,
    daysLeft: 16
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    startDate: '2025-11-25',
    endDate: '2026-11-25',
    deadline: '2025-11-24',
    applicants: 18,
    daysLeft: 10
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    startDate: '2025-12-15',
    endDate: '2026-12-15',
    deadline: '2025-12-10',
    applicants: 31,
    daysLeft: 26
  },
  {
    id: '4',
    title: 'Data Scientist',
    department: 'Analytics',
    startDate: '2025-12-05',
    endDate: '2026-12-05',
    deadline: '2025-12-01',
    applicants: 15,
    daysLeft: 17
  },
];

export default function ManageRoles() {
  const navigate = useNavigate();

  const getDeadlineColor = (daysLeft: number) => {
    if (daysLeft <= 14) return 'from-orange-500 to-red-500';
    return 'from-blue-500 to-cyan-500';
  };

  const getDeadlineBg = (daysLeft: number) => {
    if (daysLeft <= 14) return 'from-orange-50 to-red-50';
    return 'from-blue-50 to-cyan-50';
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="mb-2">Manage Roles</h1>
            <p className="text-slate-500">Review and manage all active positions</p>
          </div>
          <Button
            onClick={() => navigate('/admin/add-role')}
            className="h-12 px-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
          >
            <Plus className="w-4 h-4 mr-2" strokeWidth={1.5} />
            Add New Role
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg shadow-purple-100/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Roles</p>
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-slate-900">{mockRoles.length}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg shadow-purple-100/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Total Applicants</p>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-600" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-slate-900">{mockRoles.reduce((sum, role) => sum + role.applicants, 0)}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg shadow-purple-100/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Urgent Deadlines</p>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-orange-600" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-slate-900">{mockRoles.filter(r => r.daysLeft <= 14).length}</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg shadow-purple-100/50">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500">Avg. Applicants</p>
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" strokeWidth={1.5} />
              </div>
            </div>
            <p className="text-slate-900">
              {Math.round(mockRoles.reduce((sum, role) => sum + role.applicants, 0) / mockRoles.length)}
            </p>
          </div>
        </div>

        {/* Roles Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {mockRoles.map((role) => (
            <div
              key={role.id}
              onClick={() => navigate(`/admin/role/${role.id}`)}
              className={`group bg-white/80 backdrop-blur-sm rounded-3xl p-8 border shadow-lg hover:shadow-xl cursor-pointer transition-all hover:scale-[1.02] ${
                role.daysLeft <= 14
                  ? 'border-orange-200 shadow-orange-100/50 hover:shadow-orange-200/50'
                  : 'border-white shadow-purple-100/50 hover:shadow-purple-200/50'
              }`}
            >
              {/* Spotlight Indicator */}
              {role.daysLeft <= 14 && (
                <div className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200">
                  <Sparkles className="w-4 h-4 text-orange-600" strokeWidth={1.5} />
                  <span className="text-sm text-orange-700">Deadline Approaching</span>
                </div>
              )}

              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <p className="text-sm text-slate-500 mb-2">{role.department}</p>
                  <h2 className="mb-3 text-slate-900 group-hover:text-indigo-700 transition-colors">
                    {role.title}
                  </h2>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all flex-shrink-0 ml-4 mt-1" strokeWidth={1.5} />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-indigo-600" strokeWidth={1.5} />
                    <p className="text-xs text-slate-500">Applicants</p>
                  </div>
                  <p className="text-slate-900">{role.applicants}</p>
                </div>

                <div className={`p-4 rounded-xl border bg-gradient-to-br ${getDeadlineBg(role.daysLeft)} ${
                  role.daysLeft <= 14 ? 'border-orange-200' : 'border-blue-200'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className={`w-4 h-4 ${role.daysLeft <= 14 ? 'text-orange-600' : 'text-blue-600'}`} strokeWidth={1.5} />
                    <p className="text-xs text-slate-500">Deadline</p>
                  </div>
                  <p className={role.daysLeft <= 14 ? 'text-orange-700' : 'text-blue-700'}>
                    {role.daysLeft} days left
                  </p>
                </div>
              </div>

              {/* Timeline */}
              <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-slate-600" strokeWidth={1.5} />
                  <p className="text-xs text-slate-500">Timeline</p>
                </div>
                <p className="text-sm text-slate-700">
                  {new Date(role.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  {' → '}
                  {new Date(role.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
