/**
 * ActiveFilters Component (Molecule)
 * 
 * Displays active filters as removable chips.
 */

import PropTypes from 'prop-types';

const ActiveFilters = ({ searchTerm, filters, onRemoveSearch, onRemoveFilter }) => {
  
  // Build array of active filters
  const activeFilters = [];
  
  if (searchTerm) {
    activeFilters.push({
      key: 'search',
      label: `Search: "${searchTerm}"`,
      onRemove: onRemoveSearch
    });
  }
  
  if (filters.bedrooms) {
    activeFilters.push({
      key: 'bedrooms',
      label: `${filters.bedrooms} ${filters.bedrooms === '1' ? 'Bedroom' : 'Bedrooms'}`,
      onRemove: () => onRemoveFilter('bedrooms')
    });
  }
  
  if (filters.minPrice) {
    activeFilters.push({
      key: 'minPrice',
      label: `Min: $${parseInt(filters.minPrice).toLocaleString()}`,
      onRemove: () => onRemoveFilter('minPrice')
    });
  }
  
  if (filters.maxPrice) {
    activeFilters.push({
      key: 'maxPrice',
      label: `Max: $${parseInt(filters.maxPrice).toLocaleString()}`,
      onRemove: () => onRemoveFilter('maxPrice')
    });
  }
  
  if (filters.availableOnly === 'true') {
    activeFilters.push({
      key: 'availableOnly',
      label: 'Available Only',
      onRemove: () => onRemoveFilter('availableOnly')
    });
  }
  
  if (filters.availableOnly === 'false') {
    activeFilters.push({
      key: 'availableOnly',
      label: 'Rented Only',
      onRemove: () => onRemoveFilter('availableOnly')
    });
  }
  
  if (activeFilters.length === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <span className="text-sm font-medium text-[#666666] py-2">
        Active Filters:
      </span>
      {activeFilters.map(filter => (
        <button
          key={filter.key}
          onClick={filter.onRemove}
          className="
            flex items-center gap-2
            px-4 py-2
            bg-[#d4a574] text-white
            text-sm font-medium
            rounded-full
            hover:bg-[#1a1a1a]
            transition-colors duration-300
          "
        >
          {filter.label}
          <span className="text-lg leading-none">×</span>
        </button>
      ))}
    </div>
  );
};

ActiveFilters.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  filters: PropTypes.shape({
    bedrooms: PropTypes.string,
    minPrice: PropTypes.string,
    maxPrice: PropTypes.string,
    availableOnly: PropTypes.string,
  }).isRequired,
  onRemoveSearch: PropTypes.func.isRequired,
  onRemoveFilter: PropTypes.func.isRequired,
};

export default ActiveFilters;
