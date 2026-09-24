import axios from 'axios';

// Base URL for API requests
const API_BASE_URL = 'http://localhost:8000/api';

/**
 * Post API service
 */
export const PostService = {
  // Get all posts with optional pagination
  async getAllPosts(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const response = await axios.get(`${API_BASE_URL}/posts?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Get a single post by ID
  async getPost(postId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post ${postId}:`, error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Create a new post
  async createPost(postData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/posts/`, postData);
      return response.data;
    } catch (error) {
      console.error('Error creating post:', error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Update an existing post
  async updatePost(postId, postData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/posts/${postId}`, postData);
      return response.data;
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Delete a post
  async deletePost(postId) {
    try {
      await axios.delete(`${API_BASE_URL}/posts/${postId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error.response?.data?.detail || error.message);
      throw error;
    }
  }
};

/**
 * Category API service
 */
export const CategoryService = {
  // Get all categories
  async getAllCategories() {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/`); // Added trailing slash
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Get a single category by ID
  async getCategory(categoryId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/${categoryId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching category ${categoryId}:`, error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Create a new category
  async createCategory(categoryData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/categories/`, categoryData);
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Update an existing category
  async updateCategory(categoryId, categoryData) {
    try {
      const response = await axios.put(`${API_BASE_URL}/categories/${categoryId}`, categoryData);
      return response.data;
    } catch (error) {
      console.error(`Error updating category ${categoryId}:`, error.response?.data?.detail || error.message);
      throw error;
    }
  },
  
  // Delete a category
  async deleteCategory(categoryId) {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${categoryId}`);
      return true;
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error.response?.data?.detail || error.message);
      throw error;
    }
  }
};

/**
 * Google Sheets API service (daily market notes)
 */
export const SheetsService = {
  // Get daily market notes from the Google Sheet-backed endpoint
  async getDailyNotes() {
    try {
      const response = await axios.get(`${API_BASE_URL}/daily-notes`);
      return response.data;
    } catch (error) {
      console.error('Error fetching daily notes:', error.response?.data?.detail || error.message);
      throw error;
    }
  }
};
