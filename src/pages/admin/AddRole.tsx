import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import TagInput from '../../components/TagInput';
import FileUpload from '../../components/FileUpload';
import { Briefcase, Calendar, AlertCircle } from 'lucide-react';

export default function AddRole() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    startDate: '',
    endDate: '',
    deadline: ''
  });
  const [technicalSkills, setTechnicalSkills] = useState<string[]>([]);
  const [softSkills, setSoftSkills] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save role data
    navigate('/admin/manage-roles');
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="mb-2">Add New Role</h1>
            <p className="text-slate-500">Create a new position and start receiving applications</p>
          </div>
          <Button
            onClick={() => navigate('/admin/manage-roles')}
            variant="outline"
            className="rounded-xl border-slate-200"
          >
            View All Roles
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-600" strokeWidth={1.5} />
              </div>
              <h2>Role Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="title">Role Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g. Senior Frontend Developer"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="rounded-xl border-slate-200 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  type="text"
                  placeholder="e.g. Engineering, Marketing"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                  className="rounded-xl border-slate-200 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Application Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  required
                  className="rounded-xl border-slate-200 h-12"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="description">Role Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the role, responsibilities, and what makes it exciting..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  className="rounded-xl border-slate-200 min-h-32"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Required Skills</h2>
            <div className="space-y-6">
              <div>
                <Label className="mb-3 block">Technical Skills</Label>
                <TagInput
                  tags={technicalSkills}
                  setTags={setTechnicalSkills}
                  placeholder="e.g. React, Python, AWS..."
                  maxTags={10}
                />
              </div>
              <div>
                <Label className="mb-3 block">Soft Skills</Label>
                <TagInput
                  tags={softSkills}
                  setTags={setSoftSkills}
                  placeholder="e.g. Communication, Leadership..."
                  maxTags={10}
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
              </div>
              <h2>Timeline</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="startDate">Role Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="rounded-xl border-slate-200 h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="endDate">Role End Date (if applicable)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="rounded-xl border-slate-200 h-12"
                />
              </div>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-blue-700">
                Automatic reminders will be sent 2 weeks before the application deadline
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
            <h2 className="mb-6">Supporting Documents</h2>
            <FileUpload files={files} setFiles={setFiles} />
          </div>

          {/* Submit */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/manage-roles')}
              className="h-12 px-8 rounded-xl border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 px-8 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
            >
              Publish Role
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
