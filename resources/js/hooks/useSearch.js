/**
 * useSearch Hook (Updated with Sorting)
 * 
 * Custom hook for search, filter, and sort logic.
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
    availableOnly: '',
    sortBy: 'newest',
  });
  
  /**
   * Filter and sort apartments
   */
  const filteredApartments = useMemo(() => {
    let result = [...apartments];
    
    // Apply search filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      result = result.filter(apt => 
        apt.title.toLowerCase().includes(search) ||
        apt.description.toLowerCase().includes(search)
      );
    }
    
    // Filter by bedrooms
    if (filters.bedrooms) {
      const bedroomCount = parseInt(filters.bedrooms);
      result = result.filter(apt => {
        if (bedroomCount === 4) {
          // 4+ bedrooms
          return apt.specifications.bedrooms >= 4;
        }
        return apt.specifications.bedrooms === bedroomCount;
      });
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
    
    // Filter by availability
    if (filters.availableOnly === 'true') {
      result = result.filter(apt => apt.is_available === true);
    } else if (filters.availableOnly === 'false') {
      result = result.filter(apt => apt.is_available === false);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price.amount - b.price.amount);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price.amount - a.price.amount);
        break;
      case 'bedrooms_desc':
        result.sort((a, b) => 
          b.specifications.bedrooms - a.specifications.bedrooms
        );
        break;
      case 'newest':
      default:
        // Assuming newer apartments have higher IDs
        result.sort((a, b) => b.id - a.id);
        break;
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
   * Remove single filter
   */
  const removeFilter = (key) => {
    setFilters(prev => ({
      ...prev,
      [key]: ''
    }));
  };
  
  /**
   * Clear search only
   */
  const clearSearch = () => {
    setSearchTerm('');
  };
  
  /**
   * Clear all filters and search
   */
  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      bedrooms: '',
      minPrice: '',
      maxPrice: '',
      availableOnly: '',
      sortBy: 'newest',
    });
  };
  
  /**
   * Count active filters (excluding sort)
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (filters.bedrooms) count++;
    if (filters.minPrice) count++;
    if (filters.maxPrice) count++;
    if (filters.availableOnly) count++;
    return count;
  }, [searchTerm, filters]);
  
  return {
    searchTerm,
    filters,
    filteredApartments,
    search,
    updateFilter,
    removeFilter,
    clearSearch,
    clearFilters,
    activeFilterCount,
    hasActiveFilters: activeFilterCount > 0,
  };
};

export default useSearch;