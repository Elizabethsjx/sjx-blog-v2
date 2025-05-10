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
      const response = await fetch(`${API_BASE_URL}/posts?skip=${skip}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching posts: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
  
  // Get a single post by ID
  async getPost(postId) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching post: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching post ${postId}:`, error);
      throw error;
    }
  },
  
  // Create a new post
  async createPost(postData) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error(`Error creating post: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  },
  
  // Update an existing post
  async updatePost(postId, postData) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
      
      if (!response.ok) {
        throw new Error(`Error updating post: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating post ${postId}:`, error);
      throw error;
    }
  },
  
  // Delete a post
  async deletePost(postId) {
    try {
      const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting post: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting post ${postId}:`, error);
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
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        throw new Error(`Error fetching categories: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  },
  
  // Get a single category by ID
  async getCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`Error fetching category: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching category ${categoryId}:`, error);
      throw error;
    }
  },
  
  // Create a new category
  async createCategory(categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        throw new Error(`Error creating category: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error creating category:', error);
      throw error;
    }
  },
  
  // Update an existing category
  async updateCategory(categoryId, categoryData) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      if (!response.ok) {
        throw new Error(`Error updating category: ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error updating category ${categoryId}:`, error);
      throw error;
    }
  },
  
  // Delete a category
  async deleteCategory(categoryId) {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error deleting category: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error deleting category ${categoryId}:`, error);
      throw error;
    }
  }
};
