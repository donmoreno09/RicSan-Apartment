/**
 * FilterPanel Component (Organism)
 * 
 * Advanced filtering controls for apartment search.
 * Includes search, bedrooms, price range, availability, and sort.
 */

import PropTypes from 'prop-types';

const FilterPanel = ({ 
  searchTerm,
  filters,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  activeFilterCount 
}) => {
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="
          font-[family-name:var(--font-family-playfair)]
          text-2xl font-bold
          text-[#1a1a1a]
          flex items-center gap-3
        ">
          Refine Your Search
          {activeFilterCount > 0 && (
            <span className="
              px-3 py-1
              bg-[#d4a574] text-white
              text-sm font-medium
              rounded-full
            ">
              {activeFilterCount}
            </span>
          )}
        </h3>
        
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="
              text-[#d4a574] hover:text-[#1a1a1a]
              font-medium text-sm
              transition-colors duration-300
              uppercase tracking-wider
            "
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-[#666666] mb-2">
            Search
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search apartments..."
            className="
              w-full px-4 py-3
              border border-gray-300 rounded
              focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent
              transition-all duration-300
            "
          />
        </div>
        
        {/* Bedrooms Filter */}
        <div>
          <label className="block text-sm font-medium text-[#666666] mb-2">
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => onFilterChange('bedrooms', e.target.value)}
            className="
              w-full px-4 py-3
              border border-gray-300 rounded
              focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent
              transition-all duration-300
              bg-white
            "
          >
            <option value="">Any</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
        </div>
        
        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-[#666666] mb-2">
            Min Price
          </label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => onFilterChange('minPrice', e.target.value)}
            placeholder="$0"
            min="0"
            step="100"
            className="
              w-full px-4 py-3
              border border-gray-300 rounded
              focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent
              transition-all duration-300
            "
          />
        </div>
        
        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-[#666666] mb-2">
            Max Price
          </label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', e.target.value)}
            placeholder="Any"
            min="0"
            step="100"
            className="
              w-full px-4 py-3
              border border-gray-300 rounded
              focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent
              transition-all duration-300
            "
          />
        </div>
      </div>
      
      {/* Second Row: Availability and Sort */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        
        {/* Availability Filter */}
        <div>
          <label className="block text-sm font-medium text-[#666666] mb-2">
            Availability
          </label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="availability"
                value=""
                checked={filters.availableOnly === ''}
                onChange={(e) => onFilterChange('availableOnly', e.target.value)}
                className="mr-2 text-[#d4a574] focus:ring-[#d4a574]"
              />
              <span className="text-[#666666]">All</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="availability"
                value="true"
                checked={filters.availableOnly === 'true'}
                onChange={(e) => onFilterChange('availableOnly', e.target.value)}
                className="mr-2 text-[#d4a574] focus:ring-[#d4a574]"
              />
              <span className="text-[#666666]">Available Only</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="availability"
                value="false"
                checked={filters.availableOnly === 'false'}
                onChange={(e) => onFilterChange('availableOnly', e.target.value)}
                className="mr-2 text-[#d4a574] focus:ring-[#d4a574]"
              />
              <span className="text-[#666666]">Rented Only</span>
            </label>
          </div>
        </div>
        
        {/* Sort */}
        <div>
          <label className="block text-sm font-medium text-[#666666] mb-2">
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
            className="
              w-full px-4 py-3
              border border-gray-300 rounded
              focus:outline-none focus:ring-2 focus:ring-[#d4a574] focus:border-transparent
              transition-all duration-300
              bg-white
            "
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="bedrooms_desc">Most Bedrooms</option>
          </select>
        </div>
      </div>
    </div>
  );
};

FilterPanel.propTypes = {
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
  activeFilterCount: PropTypes.number.isRequired,
};

export default FilterPanel;
