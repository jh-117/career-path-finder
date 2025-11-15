import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';
import TagInput from '../shared/TagInput';
import FileUpload from '../shared/FileUpload';
import { Code, Users, Target, Zap, Upload } from 'lucide-react';

export default function StrengthDiscovery() {
  const navigate = useNavigate();
  const { userData, setUserData } = useUser();
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({
      ...userData!,
      technicalSkills,
      softSkills,
      careerInterests,
      workStyle,
      documents,
    });
    navigate('/ai-analysis');
  };

  const workStyleOptions = [
    { value: 'autonomous', label: 'Autonomous' },
    { value: 'structured', label: 'Structured' },
    { value: 'collaborative', label: 'Collaborative' },
    { value: 'fast-paced', label: 'Fast-paced' },
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="mb-2">Strength Discovery</h1>
          <p className="text-slate-500">Help us understand your unique talents and aspirations</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Technical Skills */}
          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-blue-400/20 flex items-center justify-center">
                <Code className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
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
          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
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
          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-500" strokeWidth={1.5} />
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
          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400/20 to-green-400/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Work Style Preference</h3>
                <p className="text-sm text-slate-500">How do you work best?</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {workStyleOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setWorkStyle(option.value)}
                  className={`px-6 py-3 rounded-full border-2 transition-all ${
                    workStyle === option.value
                      ? 'border-purple-500 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:border-purple-300'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Upload Documents */}
          <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400/20 to-blue-400/20 flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3>Upload Supporting Documents</h3>
                <p className="text-sm text-slate-500">Resume, CV, Portfolio, or Project files</p>
              </div>
            </div>
            <FileUpload files={documents} setFiles={setDocuments} />
          </div>

          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-10"
            >
              Generate My AI Analysis
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
