/**
 * ApartmentsListingSection Component (Organism)
 * 
 * Comprehensive apartments listing section with filtering, search,
 * and scroll animations. Handles loading, error, and empty states.
 * 
 * 
 * Features:
 * - Integrated filter panel and active filters display
 * - Responsive apartments grid (1/2/3 columns)
 * - Scroll-triggered fade-in animations (IntersectionObserver)
 * - Loading state with spinner
 * - Error state with message
 * - Empty state with "no results" message
 * - Dynamic result count display
 * - Clear filters CTA on empty state
 * 
 * Modern Practices:
 * - Component composition (uses FilterPanel, ActiveFilters, ApartmentCard)
 * - Props interface for state management integration
 * - useRef + useEffect for scroll animations
 * - IntersectionObserver API (modern performance)
 * - Conditional rendering patterns
 * - JSDoc documentation
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} props.apartments - Array of apartment objects to display
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message (if any)
 * @param {string} props.searchTerm - Current search term
 * @param {Object} props.filters - Filter state object
 * @param {Function} props.onSearchChange - Search change handler
 * @param {Function} props.onFilterChange - Filter change handler
 * @param {Function} props.onClearFilters - Clear all filters handler
 * @param {Function} props.onClearSearch - Clear search handler
 * @param {Function} props.onRemoveFilter - Remove single filter handler
 * @param {number} props.activeFilterCount - Count of active filters
 * @param {string} [props.heading="Available Residences"] - Section heading
 * @returns {JSX.Element} Apartments listing section
 * 
 * @example
 * // Basic usage with useSearch hook
 * const {
 *   searchTerm,
 *   filters,
 *   filteredApartments,
 *   search,
 *   updateFilter,
 *   clearFilters,
 *   clearSearch,
 *   removeFilter,
 *   activeFilterCount,
 * } = useSearch();
 * 
 * <ApartmentsListingSection
 *   apartments={filteredApartments}
 *   loading={loading}
 *   error={error}
 *   searchTerm={searchTerm}
 *   filters={filters}
 *   onSearchChange={search}
 *   onFilterChange={updateFilter}
 *   onClearFilters={clearFilters}
 *   onClearSearch={clearSearch}
 *   onRemoveFilter={removeFilter}
 *   activeFilterCount={activeFilterCount}
 * />
 */

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ApartmentCard from '../../molecules/ApartmentCard/ApartmentCard';
import FilterPanel from '../FilterPanel/FilterPanel';
import ActiveFilters from '../../molecules/ActiveFilters/ActiveFilters';

const ApartmentsListingSection = ({
  apartments,
  loading,
  error,
  searchTerm,
  filters,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  onClearSearch,
  onRemoveFilter,
  activeFilterCount,
  heading = "Available Residences",
}) => {
  
  /**
   * Refs for scroll animation
   * Stores references to apartment card wrapper divs
   */
  const cardsRef = useRef([]);
  
  /**
   * Scroll-triggered animation effect
   * Uses IntersectionObserver to detect when cards enter viewport
   * Adds 'visible' class with staggered delay for cascade effect
   */
  useEffect(() => {
    // Skip if no apartments to animate
    if (apartments.length === 0) return;
    
    // Observer configuration
    const observerOptions = {
      threshold: 0.1,              // Trigger when 10% visible
      rootMargin: '0px 0px -100px 0px'  // Trigger 100px before entering viewport
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger animation by index (100ms delay per card)
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
        }
      });
    }, observerOptions);
    
    // Observe all cards
    cardsRef.current.forEach(card => {
      if (card) {
        card.classList.remove('visible');  // Reset for re-filtering
        observer.observe(card);
      }
    });
    
    // Cleanup: disconnect observer on unmount or apartments change
    return () => observer.disconnect();
  }, [apartments]);
  
  return (
    <section className="max-w-[1400px] mx-auto px-8 py-32 bg-[#f5f1ed]">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="
          font-[family-name:var(--font-family-playfair)]
          text-[3.5rem] font-bold
          text-[#1a1a1a]
          mb-4 tracking-tight
        ">
          {heading}
        </h2>
        <p className="text-[1.1rem] text-[#666666]">
          {loading 
            ? 'Loading...' 
            : `${apartments.length} ${apartments.length === 1 ? 'apartment' : 'apartments'} found`
          }
        </p>
      </div>
      
      {/* Filter Panel (only show when not loading) */}
      {!loading && (
        <>
          <FilterPanel
            searchTerm={searchTerm}
            filters={filters}
            onSearchChange={onSearchChange}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
            activeFilterCount={activeFilterCount}
          />
          
          {/* Active Filter Chips */}
          <ActiveFilters
            searchTerm={searchTerm}
            filters={filters}
            onRemoveSearch={onClearSearch}
            onRemoveFilter={onRemoveFilter}
          />
        </>
      )}
      
      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#d4a574] mx-auto mb-4"></div>
            <p className="text-[#666666]">Loading apartments...</p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {!loading && error && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="
            font-[family-name:var(--font-family-playfair)]
            text-3xl font-bold
            text-[#1a1a1a]
            mb-4
          ">
            {error}
          </h3>
          <p className="text-[#666666]">
            Please try again or contact support if the problem persists.
          </p>
        </div>
      )}
      
      {/* Empty State (no results after filtering) */}
      {!loading && !error && apartments.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="
            font-[family-name:var(--font-family-playfair)]
            text-3xl font-bold
            text-[#1a1a1a]
            mb-4
          ">
            No apartments found
          </h3>
          <p className="text-[#666666] mb-8">
            Try adjusting your filters to see more results
          </p>
          <button
            onClick={onClearFilters}
            className="
              bg-[#d4a574] text-white
              px-8 py-3
              border-none rounded-[2px]
              font-semibold cursor-pointer
              transition-all duration-300
              uppercase tracking-wider
              
              hover:bg-[#1a1a1a]
              hover:-translate-y-0.5
            "
          >
            Clear All Filters
          </button>
        </div>
      )}
      
      {/* Apartments Grid (success state with results) */}
      {!loading && !error && apartments.length > 0 && (
        <div className="grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {apartments.map((apartment, index) => (
            <div 
              key={apartment.id}
              ref={el => cardsRef.current[index] = el}
              className="card-animate"
            >
              <ApartmentCard apartment={apartment} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

/**
 * PropTypes validation
 */
ApartmentsListingSection.propTypes = {
  apartments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      // ... other apartment properties
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    bedrooms: PropTypes.string,
    minPrice: PropTypes.string,
    maxPrice: PropTypes.string,
    availableOnly: PropTypes.string,
    sortBy: PropTypes.string,
  }).isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onClearFilters: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
  activeFilterCount: PropTypes.number.isRequired,
  heading: PropTypes.string,
};

export default ApartmentsListingSection;
