import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GoogleCallback = () => {
  const [error, setError] = useState('');
  const { loginWithGoogle, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Extract code from URL
    const handleCallback = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        
        if (!code) {
          throw new Error('Authorization code not found');
        }
        
        // Get redirect URI from localStorage or use default
        const redirectUri = localStorage.getItem('authRedirectPath') || '/';
        
        // Process the code by sending it to our backend
        await loginWithGoogle(code, window.location.origin + '/google-callback');
        
        // Clear stored redirect path
        localStorage.removeItem('authRedirectPath');
        
        // Redirect user to the stored path or homepage
        navigate(redirectUri, { replace: true });
      } catch (err) {
        console.error('Google authentication error:', err);
        setError('Failed to authenticate with Google. Please try again.');
      }
    };
    
    handleCallback();
  }, [location, loginWithGoogle, navigate]);
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Authenticating with Google...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-red-600">Authentication Error</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="text-center">{error}</p>
        </div>
        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">Redirecting...</p>
    </div>
  );
};

export default GoogleCallback;
