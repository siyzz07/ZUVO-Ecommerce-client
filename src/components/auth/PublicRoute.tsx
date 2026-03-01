import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const token = localStorage.getItem('adminToken');

  // If already logged in, redirect to dashboard
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && payload.exp * 1000 > Date.now()) {
        return <Navigate to="/admin/dashboard" replace />;
      }
    } catch {
      // Invalid token — let them stay on login
    }
  }

  return <>{children}</>;
};

export default PublicRoute;
