import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Button } from '../ui/button';
import { CheckCircle, Briefcase, Mail, User } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const { userData } = useUser();

  if (!userData) {
    navigate('/signup');
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400/20 to-blue-400/20 mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" strokeWidth={1.5} />
          </div>
          <h1 className="mb-2">Welcome, {userData.name}!</h1>
          <p className="text-slate-500">Your account has been created successfully</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg shadow-purple-100/50 p-10">
          <h2 className="mb-8 text-center">Your Profile</h2>
          
          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Full Name</p>
                <p>{userData.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Department</p>
                <p>{userData.department}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Current Role</p>
                <p>{userData.currentRole}</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50/50 to-blue-50/50">
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-purple-500" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p>{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Button
              onClick={() => navigate('/strength-discovery')}
              className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-8"
            >
              Continue to Strength Discovery
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
