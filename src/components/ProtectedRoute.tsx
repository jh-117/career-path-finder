// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../lib/supabaseClient';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = '/user/login',
}) => {
  const { user, loading } = useAuth();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user has required role
  if (!allowedRoles.includes(user.role)) {
    // Redirect admin to admin login, user to user login
    const redirectPath = user.role === 'admin' ? '/admin/login' : '/user/login';
    return <Navigate to={redirectPath} replace />;
  }

  // User is authenticated and authorized
  return <>{children}</>;
};