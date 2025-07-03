
import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks';
import LoginForm from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAppSelector((state) => {
    return state.auth
  });


  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
