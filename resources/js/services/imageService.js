/**
 * Image Service
 * 
 * Handles all image-related API communication.
 * Provides methods to upload, delete, and manage apartment images.
 * 
 * This service layer abstracts API calls from React components,
 * following clean architecture and separation of concerns.
 */

import api from './api';

/**
 * Image Service Object
 * 
 * Contains all methods for image operations.
 * Each method is async and returns a Promise.
 */
const imageService = {
  
  /**
   * Upload an image to an apartment
   * 
   * Uploads an image file to a specific apartment using multipart/form-data.
   * Supports progress tracking via callback function.
   * 
   * @param {number|string} apartmentId - The apartment ID to upload image to
   * @param {File} file - Image file object from input or drag-drop
   * @param {boolean} isPrimary - Whether this should be the primary/featured image (default: false)
   * @param {Function} onProgress - Optional callback for upload progress (receives percentage 0-100)
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - message: string (success message)
   *   - data: Uploaded image object with url, cloudinary_public_id, metadata
   * @throws {Error} If upload fails, validation error (422), or file too large
   * 
   * @example
   * // Basic upload
   * const file = event.target.files[0];
   * const response = await imageService.upload(1, file);
   * console.log(response.data.url); // Cloudinary URL
   * 
   * @example
   * // Upload as primary image with progress tracking
   * const response = await imageService.upload(
   *   apartmentId, 
   *   file, 
   *   true,
   *   (progress) => console.log(`${progress}% uploaded`)
   * );
   */
  upload: async (apartmentId, file, isPrimary = false, onProgress = null) => {
    try {
      // Create FormData for multipart/form-data encoding
      // Required for file uploads - can't send files as JSON
      const formData = new FormData();
      formData.append('image', file);
      formData.append('is_primary', isPrimary ? '1' : '0');

      // Configure request with proper headers
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      // Add progress tracking if callback provided
      if (onProgress) {
        config.onUploadProgress = (progressEvent) => {
          // Calculate percentage: (loaded / total) * 100
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          onProgress(percentCompleted);
        };
      }

      // Make POST request to /apartments/{id}/images
      // Uses template literal to insert apartmentId into URL
      const response = await api.post(
        `/apartments/${apartmentId}/images`,
        formData,
        config
      );

      return response.data;
    } catch (error) {
      // Provide more context in error message
      console.error(`Error uploading image to apartment ${apartmentId}:`, error);
      
      // Check for specific error types
      if (error.response && error.response.status === 422) {
        console.error('Validation errors:', error.response.data.errors);
      }
      
      if (error.response && error.response.status === 413) {
        console.error('File too large - exceeds server limit');
      }
      
      throw error;
    }
  },

  /**
   * Delete an image
   * 
   * Deletes an image from both Cloudinary storage and database.
   * Also handles cleanup if deleted image was primary (auto-assigns new primary).
   * 
   * @param {number|string} imageId - The image ID to delete
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - message: string (deletion confirmation)
   * @throws {Error} If image not found (404) or deletion fails
   * 
   * @example
   * // Delete image with ID 25
   * const response = await imageService.delete(25);
   * console.log(response.message); // "Image deleted successfully"
   */
  delete: async (imageId) => {
    try {
      // Make DELETE request to /images/{id}
      // Uses template literal to insert imageId into URL
      const response = await api.delete(`/images/${imageId}`);
      
      return response.data;
    } catch (error) {
      // Provide more context in error message
      console.error(`Error deleting image ${imageId}:`, error);
      
      // Check if it's a 404 error
      if (error.response && error.response.status === 404) {
        console.error('Image not found');
      }
      
      throw error;
    }
  },

  /**
   * Set image as primary
   * 
   * Sets a specific image as the primary/featured image for its apartment.
   * Automatically unsets any other primary images for that apartment.
   * 
   * @param {number|string} imageId - The image ID to set as primary
   * @returns {Promise<Object>} API response containing:
   *   - success: boolean
   *   - message: string (update confirmation)
   *   - data: Updated image object with is_primary: true
   * @throws {Error} If image not found (404) or update fails
   * 
   * @example
   * // Set image 30 as primary
   * const response = await imageService.setPrimary(30);
   * console.log(response.data.is_primary); // true
   */
  setPrimary: async (imageId) => {
    try {
      // Make PATCH request to /images/{id}/primary
      // Uses template literal to insert imageId into URL
      const response = await api.patch(`/images/${imageId}/primary`);
      
      return response.data;
    } catch (error) {
      // Provide more context in error message
      console.error(`Error setting image ${imageId} as primary:`, error);
      
      // Check if it's a 404 error
      if (error.response && error.response.status === 404) {
        console.error('Image not found');
      }
      
      throw error;
    }
  },

};

/**
 * Export image service
 * 
 * This allows other files to import and use the service:
 * import imageService from './imageService';
 */
export default imageService;