import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CategoriesPage from './pages/CategoriesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SuggestedStocksPage from './pages/WatchListPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PasswordResetPage from './pages/PasswordResetPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import GoogleCallback from './components/auth/GoogleCallback';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route index element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="categories/:id" element={<CategoriesPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="watchlist" element={<SuggestedStocksPage />} />
          <Route path="stocks/:symbol" element={<SuggestedStocksPage />} />
          <Route path="fomc/:topic" element={<BlogPage />} />
          
          {/* Authentication routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<PasswordResetPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
          <Route path="google-callback" element={<GoogleCallback />} />
          
          {/* Protected routes */}
          <Route path="profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          
          {/* Admin routes can be added here */}
          
          {/* Catch-all route */}
          <Route path="*" element={
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
              <p className="mb-8">The page you are looking for doesn't exist.</p>
              <a href="/" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
                Return to Home
              </a>
            </div>
          } />
        </Route>
      </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
