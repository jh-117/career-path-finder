import { ArrowRight, User } from 'lucide-react';

interface Applicant {
  id: string;
  name: string;
  avatar: string;
  matchScore: number;
  skills: string[];
  appliedDate: string;
}

interface ApplicantCardProps {
  applicant: Applicant;
  onClick: () => void;
}

export default function ApplicantCard({ applicant, onClick }: ApplicantCardProps) {
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
      className="group bg-slate-50/50 hover:bg-white rounded-2xl p-6 border border-slate-100 hover:border-purple-200 cursor-pointer transition-all hover:shadow-lg hover:shadow-purple-100/50"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 text-white">
          <span>{applicant.avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-slate-900 mb-1 group-hover:text-purple-700 transition-colors truncate">
            {applicant.name}
          </h3>
          <p className="text-xs text-slate-500">
            Applied {new Date(applicant.appliedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </p>
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getScoreBg(applicant.matchScore)} flex items-center justify-center flex-shrink-0`}>
          <span className={`text-sm bg-gradient-to-br ${getScoreColor(applicant.matchScore)} bg-clip-text text-transparent`}>
            {applicant.matchScore}%
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {applicant.skills.slice(0, 3).map((skill, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-lg bg-white border border-purple-100 text-purple-700 text-xs"
          >
            {skill}
          </span>
        ))}
        {applicant.skills.length > 3 && (
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs">
            +{applicant.skills.length - 3}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200">
        <span className="text-sm text-purple-600 group-hover:text-purple-700">View Profile</span>
        <ArrowRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
      </div>
    </div>
  );
}
