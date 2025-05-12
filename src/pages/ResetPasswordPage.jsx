import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract token from URL on component mount
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get('token');
    
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError('Reset token is missing. Please use the link sent to your email.');
    }
  }, [location]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    
    if (!token) {
      setError('Reset token is missing. Please use the link sent to your email.');
      return;
    }
    
    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
      setError('');
      
      // Redirect to login after a delay
      setTimeout(() => {
        navigate('/login', { state: { message: 'Password has been reset successfully. You can now login with your new password.' } });
      }, 3000);
    } catch (err) {
      setError('Failed to reset password. The token may be invalid or expired.');
    }
  };
  
  if (success) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Password Reset Successful</h1>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="text-center">
            Your password has been reset successfully. You will be redirected to the login page.
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Reset Your Password</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            New Password
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            minLength={8}
          />
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Must be at least 8 characters
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confirm New Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading || !token}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Resetting Password...' : 'Reset Password'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Return to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
