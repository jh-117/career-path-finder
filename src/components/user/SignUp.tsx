import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Sparkles, Chrome } from 'lucide-react';

export default function SignUp() {
  const navigate = useNavigate();
  const { setUserData } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    currentRole: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserData({
      name: formData.name,
      email: formData.email,
      department: formData.department,
      currentRole: formData.currentRole,
      technicalSkills: [],
      softSkills: [],
      careerInterests: [],
      workStyle: '',
      documents: [],
    });
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 mb-4">
            <Sparkles className="w-8 h-8 text-purple-500" strokeWidth={1.5} />
          </div>
          <h1 className="mb-2">Career Path Finder</h1>
          <p className="text-slate-500">Discover your perfect career journey</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                type="text"
                placeholder="e.g. Engineering, Marketing, Sales"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentRole">Current Role</Label>
              <Input
                id="currentRole"
                type="text"
                placeholder="e.g. Junior Developer, Marketing Associate"
                value={formData.currentRole}
                onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="rounded-xl border-slate-200"
              />
            </div>

            <Button type="submit" className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
              Sign Up
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-slate-500">or</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-xl border-slate-200"
            >
              <Chrome className="w-4 h-4 mr-2" strokeWidth={1.5} />
              Login with Google
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-purple-600 hover:text-purple-700"
            >
              Already have an account? Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
