/**
 * ApartmentCard Component (Molecule)
 * 
 * Displays apartment in card format using Tailwind CSS.
 * Combines Badge and Button atoms.
 */

import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Badge from '../../atoms/Badge/Badge';
import Button from '../../atoms/Button/Button';

const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/apartments/${apartment.id}`);
  };
  
  const imageUrl = apartment.images && apartment.images.length > 0 
    ? apartment.images[0].image_path 
    : 'https://via.placeholder.com/400x300?text=No+Image';
  
  const shortDescription = apartment.description.length > 100
    ? apartment.description.substring(0, 100) + '...'
    : apartment.description;
  
  return (
    <div className="
      flex flex-col
      bg-white rounded-2xl overflow-hidden
      shadow-md hover:shadow-2xl
      transition-all duration-300
      hover:-translate-y-2
      cursor-pointer
    ">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={apartment.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <Badge status={apartment.is_available ? 'available' : 'rented'} />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col p-6 gap-4">
        {/* Title */}
        <h3 className="font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-charcoal]">
          {apartment.name}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {shortDescription}
        </p>
        
        {/* Specs */}
        <div className="flex gap-4 pb-4 border-b border-gray-200">
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="text-lg">🛏️</span>
            <span className="font-medium">{apartment.bedrooms} Bed</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="text-lg">🚿</span>
            <span className="font-medium">{apartment.bathrooms} Bath</span>
          </span>
          <span className="flex items-center gap-1.5 text-sm text-gray-600">
            <span className="text-lg">📐</span>
            <span className="font-medium">{apartment.square_feet} sqft</span>
          </span>
        </div>
        
        {/* Footer - Price & Button */}
        <div className="flex justify-between items-center mt-auto">
          <div className="font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-gold]">
            ${apartment.price.toLocaleString()}/mo
          </div>
          <Button 
            variant="outline" 
            size="small"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

ApartmentCard.propTypes = {
  apartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    square_feet: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    is_available: PropTypes.bool.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        image_path: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default ApartmentCard;
