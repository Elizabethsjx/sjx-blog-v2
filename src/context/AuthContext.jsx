import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create the auth context
const AuthContext = createContext();

// Base URL for API
const API_BASE_URL = 'http://localhost:8000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios with auth header
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if token is valid and get user data on load
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          // Decode token to check expiration
          const decoded = jwtDecode(token);
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            console.log('Token expired, logging out');
            logout();
            return;
          }
          
          // Get user data
          const response = await axios.get(`${API_BASE_URL}/auth/me`);
          setUser(response.data);
        } catch (err) {
          console.error('Error initializing auth:', err);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  // Register a new user
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // FastAPI expects form data for OAuth2 password flow
      const formData = new FormData();
      formData.append('username', email);
      formData.append('password', password);
      
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`, 
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          withCredentials: true // Important for cookies
        }
      );
      
      const { access_token } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', access_token);
      
      // Update state
      setToken(access_token);
      
      // Get user data
      const userResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      
      setUser(userResponse.data);
      return userResponse.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async (code, redirectUri) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/google/login`,
        { code, redirect_uri: redirectUri },
        { withCredentials: true }
      );
      
      const { access_token } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', access_token);
      
      // Update state
      setToken(access_token);
      
      // Get user data
      const userResponse = await axios.get(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      });
      
      setUser(userResponse.data);
      return userResponse.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Google login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get Google auth URL
  const getGoogleAuthUrl = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/auth/google/auth-url`);
      return response.data.auth_url;
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to get Google auth URL');
      throw err;
    }
  };

  // Request password reset
  const requestPasswordReset = async (email) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/password-reset`, { email });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Password reset request failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password with token
  const resetPassword = async (token, newPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, { 
        token, 
        new_password: newPassword 
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.detail || 'Password reset failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Call logout endpoint to clear refresh token cookie
      await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      // Clear local storage and state
      localStorage.removeItem('token');
      setToken(null);
      setUser(null);
    }
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/refresh`,
        {},
        { withCredentials: true }
      );
      
      const { access_token } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', access_token);
      
      // Update state
      setToken(access_token);
      
      return access_token;
    } catch (err) {
      console.error('Error refreshing token:', err);
      logout();
      throw err;
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.is_admin === true;
  };

  // Context value
  const value = {
    user,
    loading,
    error,
    token,
    isAuthenticated: !!user,
    isAdmin,
    register,
    login,
    loginWithGoogle,
    getGoogleAuthUrl,
    logout,
    requestPasswordReset,
    resetPassword,
    refreshToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
