/**
 * AmenitiesSection Component (Organism)
 * 
 * Dark-themed section showcasing premium building amenities.
 * Features 4 amenity cards in responsive grid with hover animations.
 * 
 * Extracted from HomePage.jsx in Phase 5 Task #2.2 to follow
 * Single Responsibility Principle and improve maintainability.
 * 
 * Features:
 * - Dark background (#1a1a1a) with pattern overlay
 * - Responsive grid (1/2/4 columns)
 * - Hover animations (scale + rotate on icon circles)
 * - Customizable heading, description, amenities
 * - Default amenities provided
 * 
 * Modern Practices:
 * - Component composition
 * - PropTypes validation with shape
 * - Default parameters (ES6+)
 * - JSDoc documentation
 * - Array prop pattern
 * 
 * @component
 * @param {Object} props - Component props
 * @param {Array} [props.amenities] - Array of amenity objects
 * @param {string} [props.heading="Premium Amenities"] - Section heading
 * @param {string} [props.description] - Section description
 * @returns {JSX.Element} Dark amenities section
 * 
 * @example
 * // Basic usage with defaults
 * <AmenitiesSection />
 * 
 * @example
 * // Custom amenities
 * <AmenitiesSection 
 *   heading="Building Features"
 *   amenities={[
 *     { title: 'Pool', desc: 'Olympic-size pool...' },
 *     { title: 'Gym', desc: 'State-of-the-art gym...' }
 *   ]}
 * />
 */

import PropTypes from 'prop-types';

/**
 * Default amenities data
 * Used when no amenities prop is provided
 */
const DEFAULT_AMENITIES = [
  {
    title: 'Prime Location',
    desc: 'Situated in the heart of the city with easy access to shopping, dining, and entertainment venues.'
  },
  {
    title: '24/7 Concierge',
    desc: 'Professional concierge service available around the clock to assist with all your needs.'
  },
  {
    title: 'Fitness Center',
    desc: 'State-of-the-art gym with modern equipment, yoga studio, and personal training services.'
  },
  {
    title: 'Secure Parking',
    desc: 'Underground parking with 24/7 security surveillance and EV charging stations.'
  }
];

const AmenitiesSection = ({ 
  amenities = DEFAULT_AMENITIES,
  heading = "Premium Amenities",
  description = "Experience elevated urban living with world-class facilities"
}) => {
  
  return (
    <section className="
      bg-[#1a1a1a] text-white
      py-32 px-8
      relative overflow-hidden
    ">
      {/* Pattern Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(212, 165, 116, 0.03) 50px, rgba(212, 165, 116, 0.03) 100px)'
        }}
        aria-hidden="true"
      ></div>
      
      <div className="max-w-[1400px] mx-auto relative z-[1]">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="
            font-[family-name:var(--font-family-playfair)]
            text-[3.5rem] font-bold
            mb-4
          ">
            {heading}
          </h2>
          <p className="text-white/70 text-[1.1rem]">
            {description}
          </p>
        </div>
        
        {/* Amenities Grid */}
        <div className="grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="text-center group">
              {/* Icon Circle */}
              <div className="
                w-20 h-20 mx-auto mb-8
                bg-[#d4a574] rounded-full
                flex items-center justify-center
                transition-all duration-300
                group-hover:scale-110 group-hover:rotate-[5deg]
              ">
                {/* Empty circle - decorative */}
                <div className="w-10 h-10"></div>
              </div>
              
              {/* Title */}
              <h3 className="
                font-[family-name:var(--font-family-playfair)]
                text-2xl font-bold
                mb-4
              ">
                {amenity.title}
              </h3>
              
              {/* Description */}
              <p className="text-white/70 leading-relaxed">
                {amenity.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * PropTypes validation
 */
AmenitiesSection.propTypes = {
  amenities: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ),
  heading: PropTypes.string,
  description: PropTypes.string,
};

export default AmenitiesSection;
