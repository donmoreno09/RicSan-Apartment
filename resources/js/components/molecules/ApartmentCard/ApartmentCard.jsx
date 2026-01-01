/**
 * ApartmentCard Component (Molecule) - Enhanced Design
 * 
 * Updated with SVG icons and feature tags matching original reference.
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
  
  // Extract feature tags (first 3 amenities if available)
  const featureTags = apartment.amenities?.slice(0, 3).map(a => a.name) || [];
  
  return (
    <div className="
      flex flex-col
      bg-white rounded-lg overflow-hidden
      shadow-md hover:shadow-2xl
      transition-all duration-500
      hover:-translate-y-2
      cursor-pointer
      group
    ">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden bg-gray-200">
        <img 
          src={imageUrl} 
          alt={apartment.name}
          loading="lazy"
          className="
            w-full h-full object-cover 
            transition-transform duration-700
            group-hover:scale-110
          "
        />
        <div className="absolute top-4 right-4">
          <Badge status={apartment.is_available ? 'available' : 'rented'} />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="flex flex-col p-6 gap-4">
        {/* Title */}
        <h3 className="
          font-[family-name:--font-family-playfair] 
          text-2xl font-bold 
          text-[--color-primary]
        ">
          {apartment.title}
        </h3>
        
        {/* Specs with SVG Icons */}
        <div className="flex gap-6 pb-4">
          {/* Bedrooms */}
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            <span className="text-sm font-medium">{apartment.specifications.bedrooms} Bed</span>
          </div>
          
          {/* Bathrooms */}
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">{apartment.specifications.bathrooms} Bath</span>
          </div>
          
          {/* Square Feet */}
          <div className="flex items-center gap-2 text-gray-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span className="text-sm font-medium">{apartment.specifications.square_feet} sq ft</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="
          font-[family-name:--font-family-playfair] 
          text-3xl font-bold 
          text-[--color-accent]
          mb-2
        ">
          ${apartment.price.amount}<span className="text-lg font-normal text-gray-600">/mo</span>
        </div>
        
        {/* Feature Tags */}
        {featureTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {featureTags.map((tag, index) => (
              <span 
                key={index}
                className="
                  px-3 py-1.5
                  bg-[--color-accent]/10
                  text-[--color-accent]
                  text-xs font-medium
                  rounded-full
                  border border-[--color-accent]/20
                "
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {/* View Details Button */}
        <Button 
          variant="outline" 
          size="small"
          onClick={handleViewDetails}
          className="w-full"
        >
          View Details
        </Button>
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
    images: PropTypes.array,
    amenities: PropTypes.array,
  }).isRequired,
};

export default ApartmentCard;