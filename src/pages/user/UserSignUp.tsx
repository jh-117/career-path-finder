import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Sparkles } from 'lucide-react';

const UserSignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [currentRole, setCurrentRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signUp(email, password, { name, department, currentRole }); // optional metadata

    if (error) {
      setError(error.message || 'Failed to sign up');
      setLoading(false);
    } else {
      navigate('/onboarding');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 mb-6">
            <Sparkles className="w-10 h-10 text-purple-600" strokeWidth={1.5} />
          </div>
          <h1 className="mb-3">Career Path Finder</h1>
          <p className="text-slate-500">Discover your perfect career journey</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-xl border-slate-200 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                type="text"
                placeholder="e.g. Engineering, Marketing, Sales"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
                className="rounded-xl border-slate-200 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentRole">Current Role</Label>
              <Input
                id="currentRole"
                type="text"
                placeholder="e.g. Junior Developer, Marketing Associate"
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                required
                className="rounded-xl border-slate-200 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-xl border-slate-200 h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-slate-200 h-12"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link to="/login" className="text-sm text-purple-600 hover:text-purple-700">
              Already have an account? <span className="underline">Login</span>
            </Link>
            <div className="mt-2">
              <Link to="/admin/login" className="text-xs text-slate-400 hover:text-slate-600">
                Admin Portal →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
