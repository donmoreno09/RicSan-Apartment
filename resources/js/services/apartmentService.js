/**
 * Apartment Service
 * 
 * Handles all apartment-related API communication.
 * Provides methods to fetch, search, and filter apartments.
 * 
 * This service layer abstracts API calls from React components,
 * following clean architecture and separation of concerns.
 */

import api from './api';

/**
 * Apartment Service Object
 * 
 * Contains all methods for apartment operations.
 * Each method is async and returns a Promise.
 */
const apartmentService = {
  
  /**
   * Get all apartments (paginated)
   * 
   * Fetches the complete list of apartments from the API.
   * Supports optional pagination parameters.
   * 
   * @param {Object} params - Optional query parameters
   * @param {number} params.page - Page number (default: 1)
   * @param {number} params.per_page - Items per page (default: 10)
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Array of apartment objects
   *   - meta: Pagination metadata (current_page, total, per_page)
   * @throws {Error} If API request fails
   * 
   * @example
   * // Fetch first page with default pagination
   * const response = await apartmentService.getAll();
   * console.log(response.data); // Array of apartments
   * 
   * @example
   * // Fetch page 2 with 20 items per page
   * const response = await apartmentService.getAll({ page: 2, per_page: 20 });
   */
  getAll: async (params = {}) => {
    try {
      // Make GET request to /apartments endpoint
      // params object is sent as query string (?page=1&per_page=10)
      const response = await api.get('/apartments', { params });
      
      // Return the response data
      // Your Laravel API returns: { success: true, data: [...], meta: {...} }
      return response.data;
    } catch (error) {
      // Log error with context
      console.error('Error fetching apartments:', error);
      
      // Re-throw error so calling component can handle it
      throw error;
    }
  },

  /**
   * Get single apartment by ID
   * 
   * Fetches detailed information about a specific apartment
   * including relationships (images, features, amenities).
   * 
   * @param {number|string} id - The apartment ID
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Single apartment object with relationships
   * @throws {Error} If apartment not found (404) or request fails
   * 
   * @example
   * // Fetch apartment with ID 1
   * const response = await apartmentService.getById(1);
   * console.log(response.data.name); // "Luxury Penthouse"
   * console.log(response.data.images); // Array of images
   */
  getById: async (id) => {
    try {
      // Make GET request to /apartments/{id}
      // Uses template literal to insert id into URL
      const response = await api.get(`/apartments/${id}`);
      
      return response.data;
    } catch (error) {
      // Provide more context in error message
      console.error(`Error fetching apartment ${id}:`, error);
      
      // Check if it's a 404 error
      if (error.response && error.response.status === 404) {
        console.error('Apartment not found');
      }
      
      throw error;
    }
  },

  /**
   * Get only available apartments
   * 
   * Fetches apartments that are currently available for rent.
   * Filtered by is_available = true on the backend.
   * 
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Array of available apartments only
   * @throws {Error} If API request fails
   * 
   * @example
   * // Fetch only available apartments
   * const response = await apartmentService.getAvailable();
   * const available = response.data; // All have is_available: true
   */
  getAvailable: async () => {
    try {
      // Make GET request to /apartments/available
      // This endpoint filters server-side
      const response = await api.get('/apartments/available');
      
      return response.data;
    } catch (error) {
      console.error('Error fetching available apartments:', error);
      throw error;
    }
  },

  /**
   * Search apartments with filters
   * 
   * Searches and filters apartments based on multiple criteria.
   * All parameters are optional - omitted params are ignored.
   * 
   * @param {Object} filters - Search and filter criteria
   * @param {string} filters.name - Search by apartment name (partial match)
   * @param {number} filters.bedrooms - Filter by number of bedrooms
   * @param {number} filters.min_price - Minimum monthly price
   * @param {number} filters.max_price - Maximum monthly price
   * @param {boolean|number} filters.availability - Filter by availability (1=available, 0=rented)
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Array of filtered apartments
   * @throws {Error} If API request fails or validation error (422)
   * 
   * @example
   * // Search for 2-bedroom apartments under $3000
   * const response = await apartmentService.search({
   *   bedrooms: 2,
   *   max_price: 3000
   * });
   * 
   * @example
   * // Search by name
   * const response = await apartmentService.search({
   *   name: 'Penthouse'
   * });
   */
  search: async (filters = {}) => {
    try {
      // Make GET request to /apartments/search
      // filters object becomes query string (?bedrooms=2&max_price=3000)
      const response = await api.get('/apartments/search', { params: filters });
      
      return response.data;
    } catch (error) {
      console.error('Error searching apartments:', error);
      
      // Check for validation errors (422)
      if (error.response && error.response.status === 422) {
        console.error('Validation errors:', error.response.data.errors);
      }
      
      throw error;
    }
  },
};

/**
 * Export apartment service
 * 
 * This allows other files to import and use the service:
 * import apartmentService from './apartmentService';
 */
export default apartmentService;
