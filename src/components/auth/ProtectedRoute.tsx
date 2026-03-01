import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const token = localStorage.getItem('adminToken');

  if (!token) {
    // Redirect to login, but save the page they were trying to visit
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Optional: Check if token is expired (JWT tokens have an exp claim)
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      // Token expired — clear it and redirect
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  } catch {
    // Invalid token format — clear and redirect
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
