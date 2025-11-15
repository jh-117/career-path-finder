import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  UserCircle,
  Briefcase,
  BarChart3,
  FileText,
  Download,
  Users,
  ClipboardList,
  LogOut,
  Menu,
  ChevronDown,
  Target,
  UserPlus,
  LogIn,
  Sparkles,
} from 'lucide-react';

const Navigation: React.FC = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['user', 'admin']);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const userNavItems = [
    { path: '/onboarding', label: 'Onboarding', icon: UserCircle },
    { path: '/strength-discovery', label: 'Strength Discovery', icon: Target },
    { path: '/ai-analysis', label: 'AI Analysis', icon: Sparkles },
    { path: '/role/1', label: 'Role Details', icon: Briefcase },
    { path: '/download-report', label: 'Download Report', icon: Download },
  ];

  const adminNavItems = [
    { path: '/admin/add-role', label: 'Add Role', icon: ClipboardList },
    { path: '/admin/manage-roles', label: 'Manage Roles', icon: Briefcase },
    { path: '/admin/role/1', label: 'Role Detail', icon: FileText },
    { path: '/admin/applicant/1', label: 'Applicant Detail', icon: Users },
  ];

  const publicNavItems = [
    { path: '/signup', label: 'Sign Up', icon: UserPlus },
    { path: '/login', label: 'Login', icon: LogIn },
  ];

  const isActive = (path: string) => location.pathname === path;

  const publicPages = ['/login', '/signup', '/admin/login'];
  if (publicPages.includes(location.pathname)) {
    return null;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-slate-50 transition-colors"
      >
        <Menu size={24} className="text-slate-700" />
      </button>

      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 shadow-sm z-40 transition-all duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ width: isOpen ? '280px' : '280px' }}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-slate-900">Career Path</h1>
                <p className="text-sm text-slate-500">Finder</p>
              </div>
            </div>
            {user && (
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-900 font-medium truncate">{user.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-blue-50 text-blue-700">
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
              </div>
            )}
          </div>

          <nav className="flex-1 overflow-y-auto p-4">
            {user?.role === 'user' && (
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('user')}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
                >
                  <span>USER PORTAL</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      expandedSections.includes('user') ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>
                {expandedSections.includes('user') && (
                  <div className="mt-2 space-y-1">
                    {userNavItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all ${
                            active
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon size={20} className="mr-3 flex-shrink-0" strokeWidth={active ? 2 : 1.5} />
                          <span className={active ? 'font-medium' : ''}>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {user?.role === 'admin' && (
              <div>
                <button
                  onClick={() => toggleSection('admin')}
                  className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider hover:text-slate-600 transition-colors"
                >
                  <span>ADMIN PORTAL</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform ${
                      expandedSections.includes('admin') ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>
                {expandedSections.includes('admin') && (
                  <div className="mt-2 space-y-1">
                    {adminNavItems.map((item) => {
                      const Icon = item.icon;
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-3 text-sm rounded-xl transition-all ${
                            active
                              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                              : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Icon size={20} className="mr-3 flex-shrink-0" strokeWidth={active ? 2 : 1.5} />
                          <span className={active ? 'font-medium' : ''}>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="p-4 border-t border-slate-200">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-3 text-sm text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
            >
              <LogOut size={20} className="mr-3 flex-shrink-0" strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

export default Navigation;
