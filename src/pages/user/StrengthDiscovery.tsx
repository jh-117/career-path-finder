import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import TagInput from '../../components/TagInput';
import FileUpload from '../../components/FileUpload';
import { Code, Users, Target, Zap, Upload } from 'lucide-react';
import { supabase } from '../../lib/supabaseClient';


export default function StrengthDiscovery() {
  const navigate = useNavigate();
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [careerInterests, setCareerInterests] = useState<string[]>([]);
  const [workStyle, setWorkStyle] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let strengthProfileId: string | null = null;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Save strength profile
      const { data: strengthProfile, error: profileError } = await supabase
        .from('strength_profiles')
        .insert({
          user_id: user.id,
          work_style: workStyle,
          completed: true
        })
        .select()
        .single();

      if (profileError) throw profileError;
      strengthProfileId = strengthProfile.id;

      // Save skills and interests
      const technicalSkillsData = technicalSkills.map((skill, index) => ({
        strength_profile_id: strengthProfile.id,
        skill_name: skill,
        order_index: index + 1
      }));

      const softSkillsData = softSkills.map((skill, index) => ({
        strength_profile_id: strengthProfile.id,
        skill_name: skill,
        order_index: index + 1
      }));

      const careerInterestsData = careerInterests.map((interest, index) => ({
        strength_profile_id: strengthProfile.id,
        interest_name: interest,
        order_index: index + 1
      }));

      const [techError, softError, careerError] = await Promise.all([
        technicalSkillsData.length > 0
          ? supabase.from('technical_skills').insert(technicalSkillsData)
          : Promise.resolve({ error: null }),
        softSkillsData.length > 0
          ? supabase.from('soft_skills').insert(softSkillsData)
          : Promise.resolve({ error: null }),
        careerInterestsData.length > 0
          ? supabase.from('career_interests').insert(careerInterestsData)
          : Promise.resolve({ error: null })
      ]);

      if (techError.error) throw techError.error;
      if (softError.error) throw softError.error;
      if (careerError.error) throw careerError.error;

      // Upload files
      for (const file of files) {
        const filePath = `${user.id}/${strengthProfile.id}/${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from('strength-documents')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { error: docError } = await supabase
          .from('uploaded_documents')
          .insert({
            strength_profile_id: strengthProfile.id,
            file_name: file.name,
            file_path: filePath,
            file_size: file.size,
            file_type: file.type
          });

        if (docError) throw docError;
      }

      // Save to localStorage before API call
      localStorage.setItem('strengthData', JSON.stringify({
        technicalSkills,
        softSkills,
        careerInterests,
        workStyle,
        filesCount: files.length
      }));

      console.log('Data saved successfully. Calling AI analysis...');

      // Now call AI analysis - this is separate from data saving
      try {
        const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-strengths`;
        const { data: { session } } = await supabase.auth.getSession();

        console.log('Calling API:', apiUrl);

        const analysisResponse = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            strengthProfileId: strengthProfile.id
          })
        });

        console.log('Analysis response status:', analysisResponse.status);

        if (!analysisResponse.ok) {
          const errorText = await analysisResponse.text();
          console.error('AI Analysis Error:', errorText);
          throw new Error(`Failed to generate AI analysis: ${analysisResponse.status}`);
        }

        const analysisData = await analysisResponse.json();
        console.log('Analysis data:', analysisData);

        if (analysisData && analysisData.analysis && analysisData.analysis.id) {
          localStorage.setItem('latestAnalysisId', analysisData.analysis.id);
        }

        // Navigate to results page
        navigate('/ai-analysis');

      } catch (analysisError) {
        console.error('AI Analysis Error:', analysisError);
        
        // Data is saved, but analysis failed
        // Give user option to retry or view profile
        const retry = confirm(
          'Your data has been saved successfully, but AI analysis failed to generate. Would you like to retry the analysis?'
        );
        
        if (retry) {
          // Retry the analysis
          window.location.reload();
        } else {
          // Navigate anyway - they can generate analysis later
          navigate('/ai-analysis');
        }
      }

    } catch (error) {
      console.error('Error saving strength discovery data:', error);
      
      // This is an actual data save error
      alert('Failed to save your data. Please try again.');
      
      // If we created a profile but failed later, consider cleaning it up
      if (strengthProfileId) {
        console.log('Partial data may have been saved. Profile ID:', strengthProfileId);
      }
    } finally {
      setIsSubmitting(false);
    }
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
              disabled={isSubmitting}
              className="h-12 px-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Generate My AI Analysis'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}