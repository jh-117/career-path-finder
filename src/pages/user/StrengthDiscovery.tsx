import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import TagInput from '../../components/TagInput';
import FileUpload from '../../components/FileUpload';
import { Code, Users, Target, Zap, Upload } from 'lucide-react';

export default function StrengthDiscovery() {
  const navigate = useNavigate();
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('strengthData', JSON.stringify({
      technicalSkills,
      softSkills,
      careerInterests,
      workStyle,
      filesCount: files.length
    }));
    navigate('/ai-analysis');
  };

  const workStyleOptions = [
    { value: 'autonomous', label: 'Autonomous', gradient: 'from-purple-500 to-pink-500' },
    { value: 'structured', label: 'Structured', gradient: 'from-blue-500 to-cyan-500' },
    { value: 'collaborative', label: 'Collaborative', gradient: 'from-green-500 to-emerald-500' },
    { value: 'fast-paced', label: 'Fast-paced', gradient: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-3">Strength Discovery</h1>
          <p className="text-slate-500">Help us understand your unique talents and aspirations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Technical Skills */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 flex items-center justify-center">
                <Code className="w-7 h-7 text-purple-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Top 5 Technical Skills</h3>
                <p className="text-sm text-slate-500">What technical expertise do you have?</p>
              </div>
            </div>
            <TagInput
              tags={technicalSkills}
              setTags={setTechnicalSkills}
              placeholder="e.g. React, Python, Data Analysis..."
              maxTags={5}
            />
          </div>

          {/* Soft Skills */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                <Users className="w-7 h-7 text-blue-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Top 5 Soft Skills</h3>
                <p className="text-sm text-slate-500">Your interpersonal strengths</p>
              </div>
            </div>
            <TagInput
              tags={softSkills}
              setTags={setSoftSkills}
              placeholder="e.g. Communication, Leadership..."
              maxTags={5}
            />
          </div>

          {/* Career Interests */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center">
                <Target className="w-7 h-7 text-pink-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Top 5 Future Career Interests</h3>
                <p className="text-sm text-slate-500">What roles or fields excite you?</p>
              </div>
            </div>
            <TagInput
              tags={careerInterests}
              setTags={setCareerInterests}
              placeholder="e.g. Product Management, AI Engineering..."
              maxTags={5}
            />
          </div>

          {/* Work Style */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-green-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Work Style Preference</h3>
                <p className="text-sm text-slate-500">How do you work best?</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workStyleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setWorkStyle(option.value)}
                  className={`group relative px-6 py-4 rounded-2xl border-2 transition-all ${
                    workStyle === option.value
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50'
                      : 'border-slate-200 hover:border-purple-300 hover:bg-slate-50'
                  }`}
                >
                  <span className={`${
                    workStyle === option.value ? 'text-purple-700' : 'text-slate-700'
                  }`}>
                    {option.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 flex items-center justify-center">
                <Upload className="w-7 h-7 text-indigo-600" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Upload Supporting Documents</h3>
                <p className="text-sm text-slate-500">Resume, CV, Portfolio, or Project files</p>
              </div>
            </div>
            <FileUpload files={files} setFiles={setFiles} />
          </div>

          <div className="flex justify-center pt-8">
            <Button
              type="submit"
              className="h-12 px-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
            >
              Generate My AI Analysis
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
