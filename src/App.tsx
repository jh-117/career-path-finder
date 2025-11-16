import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Navigation from './components/Navigation';

// User Pages
import UserSignUp from './pages/user/UserSignUp';
import UserLogin from './pages/user/UserLogin';
import UserOnboarding from './pages/user/UserOnboarding';
import StrengthDiscovery from './pages/user/StrengthDiscovery';
import AIAnalysis from './pages/user/AIAnalysis';
import RoleDetails from './pages/user/RoleDetails';
import DownloadReport from './pages/user/DownloadReport';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AddRole from './pages/admin/AddRole';
import ManageRoles from './pages/admin/ManageRoles';
import AdminRoleDetail from './pages/admin/AdminRoleDetail';
import ApplicantDetail from './pages/admin/ApplicantDetail';

function AppContent() {
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const location = useLocation();

  // Pages where navigation should be hidden
  const hideNavRoutes = ['/signup', '/login', '/onboarding', '/admin/login'];
  const shouldShowNav = !hideNavRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-purple-50">
      {shouldShowNav && <Navigation />}
      <div style={{ paddingLeft: shouldShowNav ? 'var(--nav-width, 18rem)' : '0' }} className="transition-all duration-300">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/preview_page.html" element={<Navigate to="/signup" replace />} />
          <Route path="/signup" element={<UserSignUp setRole={setUserRole} />} />
          <Route path="/login" element={<UserLogin setRole={setUserRole} />} />
          <Route path="/onboarding" element={<UserOnboarding />} />
          <Route path="/strength-discovery" element={<StrengthDiscovery />} />
          <Route path="/ai-analysis" element={<AIAnalysis />} />
          <Route path="/role/:id" element={<RoleDetails />} />
          <Route path="/download-report" element={<DownloadReport />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin setRole={setUserRole} />} />
          <Route path="/admin/add-role" element={<AddRole />} />
          <Route path="/admin/manage-roles" element={<ManageRoles />} />
          <Route path="/admin/role/:id" element={<AdminRoleDetail />} />
          <Route path="/admin/applicant/:id" element={<ApplicantDetail />} />

          {/* Catch all - redirect to signup */}
          <Route path="*" element={<Navigate to="/signup" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}