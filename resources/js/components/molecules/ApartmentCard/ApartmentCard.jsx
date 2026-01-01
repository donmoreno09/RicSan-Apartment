import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Badge from '../../atoms/Badge/Badge';

const ApartmentCard = ({ apartment }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/apartments/${apartment.id}`);
  };
  
  const imageUrl = apartment.images?.[0]?.image_path || null;
  
  return (
    <div 
      onClick={handleClick}
      className="
        bg-white rounded
        overflow-hidden
        shadow-[0_10px_40px_rgba(0,0,0,0.1)]
        transition-all duration-400 ease-in-out
        cursor-pointer
        relative
        
        hover:-translate-y-2.5
        hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]
      "
    >
      {/* Image Section */}
      <div className="relative w-full h-[300px] overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={apartment.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="
            w-full h-full
            bg-gradient-to-br from-purple-500 to-purple-700
            flex items-center justify-center
          ">
            <span className="text-white/30 text-xl font-semibold">
              High-Quality Photo
            </span>
          </div>
        )}
        
        <Badge status={apartment.is_available ? 'available' : 'rented'} />
      </div>
      
      {/* Info Section */}
      <div className="p-8">
        {/* Title */}
        <h3 className="
          font-[family-name:var(--font-family-playfair)]
          text-[1.8rem] font-bold
          mb-2 text-[#1a1a1a]
        ">
          {apartment.title}
        </h3>
        
        {/* Specs */}
        <div className="flex gap-6 my-6 text-[#666666] text-[0.95rem]">
          {/* Bedrooms */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#d4a574]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
            </svg>
            <span>{apartment.specifications.bedrooms} Bed</span>
          </div>
          
          {/* Bathrooms */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#d4a574]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
            </svg>
            <span>{apartment.specifications.bathrooms} Bath</span>
          </div>
          
          {/* Square Feet */}
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#d4a574]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <span>{apartment.specifications.area_sqm} sq ft</span>
          </div>
        </div>
        
        {/* Price */}
        <div className="text-[2rem] font-bold text-[#d4a574] my-4">
          ${apartment.price.amount}/mo
        </div>
        
        {/* Feature Tags */}
        {apartment.amenities && apartment.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {apartment.amenities.slice(0, 3).map((amenity) => (
              <span 
                key={amenity.id}
                className="
                  bg-[#f5f1ed] text-[#1a1a1a]
                  px-4 py-[0.4rem]
                  rounded-full
                  text-[0.85rem] font-medium
                "
              >
                {amenity.name}
              </span>
            ))}
          </div>
        )}
        
        {/* View Details Button */}
        <button className="
          w-full mt-6 px-4 py-4
          bg-[#1a1a1a] text-white
          border-none rounded-[2px]
          font-semibold uppercase tracking-wider
          cursor-pointer
          transition-all duration-300
          text-[0.9rem]
          
          hover:bg-[#d4a574]
          hover:-translate-y-0.5
        ">
          View Details
        </button>
      </div>
    </div>
  );
};

ApartmentCard.propTypes = {
  apartment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    bedrooms: PropTypes.number.isRequired,
    bathrooms: PropTypes.number.isRequired,
    area_sqm: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    is_available: PropTypes.bool.isRequired,
    images: PropTypes.array,
    amenities: PropTypes.array,
  }).isRequired,
};

export default ApartmentCard;