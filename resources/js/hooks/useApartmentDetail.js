/**
 * useApartmentDetail Hook
 * 
 * Custom hook for fetching single apartment by ID.
 * First checks cache (context), then fetches from API if needed.
 */

import { useState, useEffect } from 'react';
import { useApartmentContext } from '../context/ApartmentContext';
import { apartmentService } from '../services';

const useApartmentDetail = (id) => {
  const { getApartmentById } = useApartmentContext();
  
  const [apartment, setApartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // First, check if we have it in cache (context)
        const cachedApartment = getApartmentById(id);
        
        if (cachedApartment) {
          // Use cached data (faster, no API call)
          setApartment(cachedApartment);
          setLoading(false);
          return;
        }
        
        // Not in cache, fetch from API
        const response = await apartmentService.getById(id);
        setApartment(response.data);
      } catch (err) {
        console.error('Error fetching apartment:', err);
        
        if (err.response && err.response.status === 404) {
          setError('Apartment not found');
        } else {
          setError('Failed to load apartment details');
        }
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchApartment();
    }
  }, [id, getApartmentById]);
  
  return { apartment, loading, error };
};

export default useApartmentDetail;
