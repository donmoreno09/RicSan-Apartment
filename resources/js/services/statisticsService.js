/**
 * Statistics Service
 * 
 * Handles statistics and dashboard data API communication.
 * Provides aggregated data about apartments, availability, pricing, etc.
 */

import api from './api';

/**
 * Statistics Service Object
 */
const statisticsService = {
  
  /**
   * Get dashboard statistics
   * 
   * Fetches aggregated statistics including:
   * - Total apartments
   * - Available apartments
   * - Average price
   * - Price range (min/max)
   * - Occupancy rate
   * 
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - data: Object with statistical data
   * @throws {Error} If API request fails
   * 
   * @example
   * const response = await statisticsService.getDashboard();
   * console.log(response.data);
   * // {
   * //   total_apartments: 6,
   * //   available_apartments: 4,
   * //   average_price: 3500,
   * //   min_price: 2000,
   * //   max_price: 5500,
   * //   occupancy_rate: 33.33
   * // }
   */
  getDashboard: async () => {
    try {
      const response = await api.get('/statistics');
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },
};

export default statisticsService;
