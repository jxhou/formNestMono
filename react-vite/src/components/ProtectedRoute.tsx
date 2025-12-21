import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuth } = useAuth();

  if (!isAuth) {
    // User is not authenticated, redirect them to the login page
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the children (the protected component)
  return <>{children}</>;
};

export default ProtectedRoute;