// src/components/Navigation.tsx
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
  X,
  ChevronDown,
  ChevronRight,
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
    navigate('/user/login');
  };

  // User navigation items
  const userNavItems = [
    { path: '/user/onboarding', label: 'Onboarding', icon: UserCircle },
    { path: '/user/strength-discovery', label: 'Strength Discovery', icon: BarChart3 },
    { path: '/user/ai-analysis', label: 'AI Analysis', icon: FileText },
    { path: '/user/role/1', label: 'Role Details', icon: Briefcase },
    { path: '/user/download-report', label: 'Download Report', icon: Download },
  ];

  // Admin navigation items
  const adminNavItems = [
    { path: '/admin/add-role', label: 'Add Role', icon: ClipboardList },
    { path: '/admin/manage-roles', label: 'Manage Roles', icon: Briefcase },
    { path: '/admin/role/1', label: 'Role Detail', icon: FileText },
    { path: '/admin/applicant/1', label: 'Applicant Detail', icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  // Don't show navigation on login/signup pages
  const publicPages = ['/user/login', '/user/signup', '/admin/login'];
  if (publicPages.includes(location.pathname)) {
    return null;
  }

  // Don't show navigation if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg z-40 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 w-64`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <h1 className="text-xl font-bold text-gray-800">Career Path Finder</h1>
            {user && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {user.role === 'admin' ? 'Admin' : 'User'}
                </span>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* User Section - Only show if user role is 'user' */}
            {user?.role === 'user' && (
              <div className="mb-6">
                <button
                  onClick={() => toggleSection('user')}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>User Portal</span>
                  {expandedSections.includes('user') ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedSections.includes('user') && (
                  <div className="mt-2 space-y-1">
                    {userNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                            isActive(item.path)
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon size={18} className="mr-3" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Admin Section - Only show if user role is 'admin' */}
            {user?.role === 'admin' && (
              <div>
                <button
                  onClick={() => toggleSection('admin')}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <span>Admin Portal</span>
                  {expandedSections.includes('admin') ? (
                    <ChevronDown size={16} />
                  ) : (
                    <ChevronRight size={16} />
                  )}
                </button>
                {expandedSections.includes('admin') && (
                  <div className="mt-2 space-y-1">
                    {adminNavItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                            isActive(item.path)
                              ? 'bg-blue-50 text-blue-600 font-medium'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon size={18} className="mr-3" />
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}

      {/* Main content padding to account for sidebar */}
      <div className="lg:ml-64">
        {/* Your page content will render here */}
      </div>
    </>
  );
};

export default Navigation;