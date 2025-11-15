import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { CheckCircle2, User, Briefcase, Mail, Building2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function UserOnboarding() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('userData');
    if (data) {
      setUserData(JSON.parse(data));
    }
  }, []);

  if (!userData) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-3xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={1.5} />
          </div>
          <h1 className="mb-3">Welcome, {userData.name}!</h1>
          <p className="text-slate-500">Your account has been created successfully</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-purple-100/50 p-10 border border-white">
          <h2 className="mb-8 text-center">Your Profile</h2>
          
          <div className="grid md:grid-cols-2 gap-5 mb-10">
            <div className="group hover:scale-[1.02] transition-transform">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-blue-50/80 border border-purple-100/50">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <User className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Full Name</p>
                  <p className="text-slate-900">{userData.name}</p>
                </div>
              </div>
            </div>

            <div className="group hover:scale-[1.02] transition-transform">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-purple-50/80 border border-blue-100/50">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Department</p>
                  <p className="text-slate-900">{userData.department}</p>
                </div>
              </div>
            </div>

            <div className="group hover:scale-[1.02] transition-transform">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-purple-50/80 to-pink-50/80 border border-purple-100/50">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-purple-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Current Role</p>
                  <p className="text-slate-900">{userData.currentRole}</p>
                </div>
              </div>
            </div>

            <div className="group hover:scale-[1.02] transition-transform">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-blue-50/80 to-indigo-50/80 border border-blue-100/50">
                <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <p className="text-slate-900">{userData.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={() => navigate('/strength-discovery')}
              className="h-12 px-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg shadow-purple-500/30"
            >
              Continue to Strength Discovery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
