import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useThemeStore, useShopStore } from './store/useStore';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Footer from './components/layout/Footer';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AddProduct from './pages/admin/AddProduct';
import EditProduct from './pages/admin/EditProduct';
import StoreSettings from './pages/admin/StoreSettings';
import CategoryManagement from './pages/admin/CategoryManagement';

// Auth Guards
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {!isAdminPage && <Navbar />}
      <main className={`flex-grow ${!isAdminPage ? 'pb-32 md:pb-0' : ''}`}>
        {children}
      </main>
      {!isAdminPage && <BottomNav />}
      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  const { theme } = useThemeStore();
  const fetchSettings = useShopStore((s) => s.fetchSettings);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Customer Route */}
          <Route path="/" element={<Home />} />
          
          {/* Admin Login — redirects to dashboard if already logged in */}
          <Route path="/admin/login" element={<PublicRoute><AdminLogin /></PublicRoute>} />

          {/* Protected Admin Routes — requires valid JWT */}
          <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/add-product" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
          <Route path="/admin/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><StoreSettings /></ProtectedRoute>} />
          <Route path="/admin/categories" element={<ProtectedRoute><CategoryManagement /></ProtectedRoute>} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

