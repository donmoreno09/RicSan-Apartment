/**
 * Services Barrel Export
 * 
 * This file exports all services from a single location,
 * making imports cleaner and more maintainable.
 * 
 * Instead of:
 *   import apartmentService from './services/apartmentService';
 *   import amenityService from './services/amenityService';
 * 
 * You can write:
 *   import { apartmentService, amenityService } from './services';
 * 
 * This is called a "barrel" because it barrels up multiple exports.
 */

export { default as apartmentService } from './apartmentService';
export { default as amenityService } from './amenityService';
export { default as statisticsService } from './statisticsService';
export { default as api } from './api';

/**
 * You can now import services in two ways:
 * 
 * Method 1 - Named imports (recommended):
 * import { apartmentService, amenityService } from '../services';
 * 
 * Method 2 - Import all:
 * import * as services from '../services';
 * services.apartmentService.getAll();
 * 
 * Method 3 - Individual (still works):
 * import apartmentService from '../services/apartmentService';
 */
