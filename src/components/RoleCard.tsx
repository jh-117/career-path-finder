import { ArrowRight } from 'lucide-react';

interface Role {
  id: string;
  title: string;
  matchScore: number;
  skills: string[];
  department: string;
}

interface RoleCardProps {
  role: Role;
  onClick: () => void;
}

export default function RoleCard({ role, onClick }: RoleCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'from-green-500 to-emerald-500';
    if (score >= 70) return 'from-blue-500 to-cyan-500';
    return 'from-purple-500 to-pink-500';
  };

  const getScoreBg = (score: number) => {
    if (score >= 85) return 'from-green-50 to-emerald-50';
    if (score >= 70) return 'from-blue-50 to-cyan-50';
    return 'from-purple-50 to-pink-50';
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/50 cursor-pointer transition-all hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-slate-500 mb-1">{role.department}</p>
          <h3 className="text-slate-900 mb-2 group-hover:text-purple-700 transition-colors">
            {role.title}
          </h3>
        </div>
        <div className="ml-3">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getScoreBg(role.matchScore)} flex items-center justify-center`}>
            <span className={`bg-gradient-to-br ${getScoreColor(role.matchScore)} bg-clip-text text-transparent`}>
              {role.matchScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {role.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-lg bg-gradient-to-r from-purple-100/80 to-blue-100/80 text-purple-700 text-xs border border-purple-200/50"
          >
            {skill}
          </span>
        ))}
        {role.skills.length > 3 && (
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs">
            +{role.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
        <span className="text-sm text-purple-600 group-hover:text-purple-700">View Details</span>
        <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
      </div>
    </div>
  );
}
