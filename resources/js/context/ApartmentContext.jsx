/**
 * ApartmentContext
 * 
 * Global state management for apartment data.
 * Provides apartments, loading, error states to all components.
 */

import { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { apartmentService } from '../services';

// Create Context
const ApartmentContext = createContext(undefined);

// Provider Component
export const ApartmentProvider = ({ children }) => {
  // Global apartment state
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  /**
   * Fetch all apartments on mount
   */
  const fetchApartments = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apartmentService.getAll();
      setApartments(response.data.data);
    } catch (err) {
      console.error('Error fetching apartments:', err);
      setError('Failed to load apartments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Refetch apartments (for manual refresh)
   */
  const refetchApartments = async () => {
    await fetchApartments();
  };
  
  /**
   * Get single apartment by ID (from cached data if available)
   */
  const getApartmentById = (id) => {
    return apartments.find(apt => apt.id === parseInt(id));
  };
  
  /**
   * Get available apartments only
   */
  const getAvailableApartments = () => {
    return apartments.filter(apt => apt.is_available);
  };
  
  // Fetch on mount
  useEffect(() => {
    fetchApartments();
  }, []);
  
  // Context value - what we share with consumers
  const value = {
    apartments,
    loading,
    error,
    refetchApartments,
    getApartmentById,
    getAvailableApartments,
  };
  
  return (
    <ApartmentContext.Provider value={value}>
      {children}
    </ApartmentContext.Provider>
  );
};

ApartmentProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the context
export const useApartmentContext = () => {
  const context = useContext(ApartmentContext);
  
  if (context === undefined) {
    throw new Error('useApartmentContext must be used within ApartmentProvider');
  }
  
  return context;
};

export default ApartmentContext;
