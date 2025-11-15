import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Shield } from 'lucide-react';

export default function AdminLogin({ setRole }: { setRole: (role: 'user' | 'admin') => void }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('admin');
    navigate('/admin/add-role');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 mb-6">
            <Shield className="w-10 h-10 text-indigo-600" strokeWidth={1.5} />
          </div>
          <h1 className="mb-3">Admin Portal</h1>
          <p className="text-slate-500">Manage roles and review applicants</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-8 border border-white">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Admin Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="rounded-xl border-slate-200 h-12"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg shadow-indigo-500/30"
              >
                Login to Admin Portal
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-slate-500 hover:text-slate-700"
            >
              Back to User Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
