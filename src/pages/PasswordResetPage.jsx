import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PasswordResetPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const { requestPasswordReset, loading } = useAuth();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    try {
      await requestPasswordReset(email);
      setSubmitted(true);
      setError('');
    } catch (err) {
      setError('Failed to request password reset. Please try again.');
    }
  };
  
  if (submitted) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Check Your Email</h1>
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <p className="text-center">
            If an account exists for {email}, we've sent password reset instructions to that email address.
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">Reset Password</h1>
      
      <p className="text-gray-600 mb-6 dark:text-gray-400">
        Enter your email address and we'll send you instructions to reset your password.
      </p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Reset Instructions'}
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

export default PasswordResetPage;
