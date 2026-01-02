/**
 * useSearch Hook
 * 
 * Custom hook for search and filter logic.
 * Filters apartments based on search term and criteria.
 */

import { useState, useMemo } from 'react';
import { useApartmentContext } from '../context/ApartmentContext';

const useSearch = () => {
  const { apartments } = useApartmentContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    bedrooms: '',
    minPrice: '',
    maxPrice: '',
    availableOnly: false,
  });
  
  /**
   * Filter apartments based on search and filters
   * Uses useMemo for performance (only recalculates when dependencies change)
   */
  const filteredApartments = useMemo(() => {
    let result = [...apartments];
    
    // Search by title/description
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(apt => 
        apt.title.toLowerCase().includes(search) ||
        apt.description.toLowerCase().includes(search)
      );
    }
    
    // Filter by bedrooms
    if (filters.bedrooms) {
      result = result.filter(apt => 
        apt.specifications.bedrooms === parseInt(filters.bedrooms)
      );
    }
    
    // Filter by min price
    if (filters.minPrice) {
      result = result.filter(apt => 
        apt.price.amount >= parseInt(filters.minPrice)
      );
    }
    
    // Filter by max price
    if (filters.maxPrice) {
      result = result.filter(apt => 
        apt.price.amount <= parseInt(filters.maxPrice)
      );
    }
    
    // Filter available only
    if (filters.availableOnly) {
      result = result.filter(apt => apt.is_available);
    }
    
    return result;
  }, [apartments, searchTerm, filters]);
  
  /**
   * Update search term
   */
  const search = (term) => {
    setSearchTerm(term);
  };
  
  /**
   * Update single filter
   */
  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  /**
   * Clear all filters
   */
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
      availableOnly: false,
    });
  };
  
  return {
    searchTerm,
    filters,
    filteredApartments,
    search,
    updateFilter,
    clearFilters,
    hasActiveFilters: searchTerm || Object.values(filters).some(v => v),
  };
};

export default useSearch;
