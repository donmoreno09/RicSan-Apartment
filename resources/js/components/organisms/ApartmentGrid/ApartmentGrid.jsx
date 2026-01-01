/**
 * ApartmentGrid Component (Organism)
 * 
 * Displays multiple ApartmentCard components in a responsive grid.
 * Handles empty state and loading state.
 */

import PropTypes from 'prop-types';
import ApartmentCard from '../../molecules/ApartmentCard/ApartmentCard';

const ApartmentGrid = ({ apartments, loading = false, className = '' }) => {
  // Loading state
  if (loading) {
    return (
      <div className={`flex justify-center items-center py-20 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[--color-gold] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading apartments...</p>
        </div>
      </div>
    );
  }
  
  // Empty state
  if (!apartments || apartments.length === 0) {
    return (
      <div className={`flex justify-center items-center py-20 ${className}`}>
        <div className="text-center">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-charcoal] mb-2">
            No Apartments Found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search criteria or check back later.
          </p>
        </div>
      </div>
    );
  }
  
  // Grid display
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
};

ApartmentGrid.propTypes = {
  apartments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bedrooms: PropTypes.number.isRequired,
      bathrooms: PropTypes.number.isRequired,
      area_sqm: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      is_available: PropTypes.bool.isRequired,
      images: PropTypes.array,
    })
  ),
  loading: PropTypes.bool,
  className: PropTypes.string,
};

ApartmentGrid.defaultProps = {
  apartments: [],
  loading: false,
  className: '',
};

export default ApartmentGrid;
