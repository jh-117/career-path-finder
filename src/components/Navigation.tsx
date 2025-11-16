import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  UserCircle,
  LogIn,
  CheckCircle,
  Target,
  BarChart3,
  Briefcase,
  FileDown,
  Shield,
  PlusCircle,
  FolderKanban,
  Users,
  UserCheck
} from 'lucide-react';

export default function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if current route is admin
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Update CSS variable when collapsed state changes
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--nav-width',
      isCollapsed ? '5rem' : '18rem'
    );
  }, [isCollapsed]);

  const isActive = (path: string) => location.pathname === path;

  const userLinks = [
    { path: '/signup', icon: UserCircle, label: 'Sign Up' },
    { path: '/login', icon: LogIn, label: 'Login' },
    { path: '/onboarding', icon: CheckCircle, label: 'Onboarding' },
    { path: '/strength-discovery', icon: Target, label: 'Strength Discovery' },
    { path: '/ai-analysis', icon: BarChart3, label: 'AI Analysis' },
    { path: '/role/1', icon: Briefcase, label: 'Role Details' },
    { path: '/download-report', icon: FileDown, label: 'Download Report' },
  ];

  const adminLinks = [
    { path: '/admin/login', icon: Shield, label: 'Admin Login' },
    { path: '/admin/add-role', icon: PlusCircle, label: 'Add Role' },
    { path: '/admin/manage-roles', icon: FolderKanban, label: 'Manage Roles' },
    { path: '/admin/role/1', icon: Briefcase, label: 'Role Detail' },
    { path: '/admin/applicant/1', icon: UserCheck, label: 'Applicant Detail' },
  ];

  // Choose which links to display based on route
  const displayLinks = isAdminRoute ? adminLinks : userLinks;
  const sectionTitle = isAdminRoute ? 'Admin Portal' : 'User Portal';

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-sm border-r border-slate-200 shadow-xl shadow-purple-100/50 transition-all duration-300 z-50 ${
        isCollapsed ? 'w-20' : 'w-72'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full bg-white border-2 border-purple-200 flex items-center justify-center hover:bg-purple-50 transition-colors shadow-lg z-10"
      >
        {isCollapsed ? (
          <ChevronRight className="w-3 h-3 text-purple-600" strokeWidth={2.5} />
        ) : (
          <ChevronLeft className="w-3 h-3 text-purple-600" strokeWidth={2.5} />
        )}
      </button>

      <div className="h-full overflow-y-auto py-6 px-4">
        {/* Logo */}
        <div className={`flex items-center gap-3 mb-8 ${isCollapsed ? 'justify-center' : 'px-2'}`}>
          <div className={`w-10 h-10 rounded-2xl ${
            isAdminRoute 
              ? 'bg-gradient-to-br from-indigo-500 to-purple-500' 
              : 'bg-gradient-to-br from-purple-500 to-blue-500'
          } flex items-center justify-center flex-shrink-0`}>
            {isAdminRoute ? (
              <Shield className="w-5 h-5 text-white" strokeWidth={1.5} />
            ) : (
              <Sparkles className="w-5 h-5 text-white" strokeWidth={1.5} />
            )}
          </div>
          {!isCollapsed && (
            <div>
              <h3 className="text-slate-900">Career Path</h3>
              <p className="text-xs text-slate-500">{isAdminRoute ? 'Admin' : 'Finder'}</p>
            </div>
          )}
        </div>

        {/* Navigation Section */}
        <div>
          {!isCollapsed && (
            <p className="text-xs uppercase tracking-wider text-slate-400 mb-3 px-2">{sectionTitle}</p>
          )}
          <nav className="space-y-1">
            {displayLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    active
                      ? isAdminRoute
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/30'
                      : isAdminRoute
                        ? 'hover:bg-indigo-50 text-slate-700 hover:text-indigo-700'
                        : 'hover:bg-purple-50 text-slate-700 hover:text-purple-700'
                  } ${isCollapsed ? 'justify-center' : ''}`}
                  title={isCollapsed ? link.label : ''}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" strokeWidth={1.5} />
                  {!isCollapsed && (
                    <span className="text-sm truncate">{link.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}