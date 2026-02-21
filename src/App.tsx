import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useThemeStore } from './store/useStore';
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

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
          <Route path="/admin/settings" element={<StoreSettings />} />
          <Route path="/admin/categories" element={<CategoryManagement />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
