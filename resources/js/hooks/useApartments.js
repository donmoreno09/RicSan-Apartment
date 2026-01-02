/**
 * useApartments Hook
 * 
 * Custom hook for accessing apartment data from context.
 * Provides apartments, loading, error states.
 */

import { useApartmentContext } from '../context/ApartmentContext';

const useApartments = () => {
  const { 
    apartments, 
    loading, 
    error, 
    refetchApartments 
  } = useApartmentContext();
  
  return {
    apartments,
    loading,
    error,
    refetch: refetchApartments,
    count: apartments.length,
    availableCount: apartments.filter(apt => apt.is_available).length,
  };
};

export default useApartments;
