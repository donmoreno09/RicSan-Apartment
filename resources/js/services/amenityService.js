/**
 * Amenity Service
 * 
 * Handles all amenity-related API communication.
 * Provides methods to fetch amenities and amenity categories.
 */

import api from './api';

/**
 * Amenity Service Object
 */
const amenityService = {
  
  /**
   * Get all amenities
   * 
   * Fetches the complete list of amenities available
   * across all apartments.
   * 
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Array of amenity objects
   * @throws {Error} If API request fails
   * 
   * @example
   * const response = await amenityService.getAll();
   * console.log(response.data); // Array of all amenities
   */
  getAll: async () => {
    try {
      const response = await api.get('/amenities');
      return response.data;
    } catch (error) {
      console.error('Error fetching amenities:', error);
      throw error;
    }
  },

  /**
   * Get single amenity by ID
   * 
   * Fetches detailed information about a specific amenity.
   * 
   * @param {number|string} id - The amenity ID
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Single amenity object
   * @throws {Error} If amenity not found (404) or request fails
   * 
   * @example
   * const response = await amenityService.getById(5);
   * console.log(response.data.name); // "Swimming Pool"
   */
  getById: async (id) => {
    try {
      const response = await api.get(`/amenities/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching amenity ${id}:`, error);
      
      if (error.response && error.response.status === 404) {
        console.error('Amenity not found');
      }
      
      throw error;
    }
  },

  /**
   * Get amenities grouped by category
   * 
   * Fetches amenities organized by their category
   * (e.g., Security, Recreation, Services).
   * 
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Object with categories as keys, amenities as values
   * @throws {Error} If API request fails
   * 
   * @example
   * const response = await amenityService.getByCategory();
   * console.log(response.data);
   * // {
   * //   "Security": [ { id: 1, name: "24/7 Security" }, ... ],
   * //   "Recreation": [ { id: 5, name: "Swimming Pool" }, ... ]
   * // }
   */
  getByCategory: async () => {
    try {
      const response = await api.get('/amenities/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching amenity categories:', error);
      throw error;
    }
  },
};

export default amenityService;
