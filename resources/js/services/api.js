/**
 * API Configuration
 * 
 * This file sets up Axios with base configuration and interceptors
 * for making HTTP requests to the Laravel API.
 */

import axios from 'axios';

/**
 * Create Axios instance with base configuration
 * 
 * What this does:
 * - Creates a configured Axios client
 * - Sets base URL from environment variables
 * - Sets default headers for all requests
 */
const api = axios.create({
  // Base URL from .env file
  baseURL: import.meta.env.VITE_API_BASE_URL,
  
  // Default headers for all requests
  headers: {
    'Content-Type': 'application/json',  // We're sending/receiving JSON
    'Accept': 'application/json',        // We expect JSON responses
  },
});

/**
 * Request Interceptor
 * 
 * Runs BEFORE every API request is sent
 * 
 * Use cases:
 * - Add authentication tokens to headers
 * - Log requests for debugging
 * - Modify request data
 */
api.interceptors.request.use(
  (config) => {
    // In future, add auth token here:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    
    // For now, just return the config as-is
    return config;
  },
  (error) => {
    // Handle request errors
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * 
 * Runs AFTER every API response is received
 * 
 * Use cases:
 * - Handle errors globally (401, 404, 500)
 * - Transform response data
 * - Log responses for debugging
 */
api.interceptors.response.use(
  (response) => {
    // If response is successful (2xx), just return it
    return response;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status code
      const { status, data } = error.response;
      
      switch (status) {
        case 404:
          console.error('Resource not found (404):', data.message);
          break;
        
        case 422:
          console.error('Validation error (422):', data.errors);
          break;
        
        case 500:
          console.error('Server error (500):', data.message);
          break;
        
        default:
          console.error(`API error (${status}):`, data.message);
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response from server:', error.request);
    } else {
      // Something else happened
      console.error('Request error:', error.message);
    }
    
    // Always reject so calling code can handle error
    return Promise.reject(error);
  }
);

/**
 * Export the configured Axios instance
 * 
 * Other files will import this to make API calls:
 * import api from './api';
 * api.get('/apartments')
 */
export default api;
