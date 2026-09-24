import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, loading, error, logout } = useAuth();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
  });
  const [formError, setFormError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Set user data once loaded
  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user]);
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // TODO: Implement profile update functionality
    // For now, we'll just toggle off editing mode and show a success message
    setIsEditing(false);
    setSuccessMessage('Profile updated successfully!');
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };
  
  // Toggle edit mode
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setFormError('');
    setSuccessMessage('');
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          User Not Found
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Please log in to view your profile.
        </p>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto my-12 p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Profile</h1>
        <div>
          {isEditing ? (
            <button
              onClick={toggleEdit}
              className="ml-2 px-4 py-2 text-sm text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Cancel
            </button>
          ) : (
            <button
              onClick={toggleEdit}
              className="ml-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          )}
          <button
            onClick={logout}
            className="ml-2 px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{formError}</span>
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={userData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
                disabled
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Email cannot be changed
              </p>
            </div>
            
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">{userData.name}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">{userData.email}</p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Type</h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {user.is_admin ? 'Administrator' : 'Standard User'}
              </p>
            </div>
            
            <div>
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Member Since</h2>
              <p className="mt-1 text-lg text-gray-900 dark:text-white">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
