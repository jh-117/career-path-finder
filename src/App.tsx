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

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-purple-50">
          <Navigation />

          <div className="min-h-screen px-4 pt-20 lg:pt-10 lg:ml-[280px] transition-all duration-300">

            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/preview_page.html" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected User Routes */}
            <Route
              path="/onboarding"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <UserOnboarding />
                </ProtectedRoute>
              }
            />
            <Route
              path="/strength-discovery"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <StrengthDiscovery />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-analysis"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <AIAnalysis />
                </ProtectedRoute>
              }
            />
            <Route
              path="/role/:id"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <RoleDetails />
                </ProtectedRoute>
              }
            />
            <Route
              path="/download-report"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <DownloadReport />
                </ProtectedRoute>
              }
            />
            
            {/* Protected Admin Routes */}
            <Route
              path="/admin/add-role"
              element={
                <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
                  <AddRole />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage-roles"
              element={
                <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
                  <ManageRoles />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/role/:id"
              element={
                <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
                  <AdminRoleDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/applicant/:id"
              element={
                <ProtectedRoute allowedRoles={['admin']} redirectTo="/admin/login">
                  <ApplicantDetail />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}