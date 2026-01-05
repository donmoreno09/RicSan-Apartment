/**
 * HeroSection Component (Organism)
 * 
 * Full-height hero section with animated headline, subtitle,
 * and call-to-action button. Features diagonal pattern overlay,
 * smooth animations, and scroll indicator.
 * 
 * Features:
 * - Full viewport height (h-screen)
 * - Gradient background with pattern overlay
 * - Animated text with staggered delays (fadeInUp)
 * - Customizable title, subtitle, CTA text
 * - Scroll indicator with bounce animation
 * - Responsive typography (mobile-first)
 * 
 * Modern Practices:
 * - Component composition
 * - PropTypes validation
 * - Default parameters (ES6+)
 * - JSDoc documentation
 * - Semantic HTML
 * 
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Luxury Living<br/>Redefined"] - Hero title (supports <br/> for line breaks)
 * @param {string} [props.subtitle="Discover Your Perfect Urban Sanctuary"] - Hero subtitle
 * @param {string} [props.ctaText="Explore Apartments"] - Call-to-action button text
 * @param {Function} [props.onCtaClick] - Optional CTA click handler
 * @returns {JSX.Element} Full-height hero section
 * 
 * @example
 * // Basic usage with defaults
 * <HeroSection />
 * 
 * @example
 * // Custom content
 * <HeroSection 
 *   title="Welcome Home<br/>To Luxury"
 *   subtitle="Your Dream Awaits"
 *   ctaText="View Apartments"
 *   onCtaClick={() => console.log('CTA clicked')}
 * />
 */

import PropTypes from 'prop-types';

const HeroSection = ({ 
  title = "Luxury Living<br/>Redefined",
  subtitle = "Discover Your Perfect Urban Sanctuary",
  ctaText = "Explore Apartments",
  onCtaClick
}) => {
  
  /**
   * Handle CTA button click
   * Default behavior: scroll to next section (one viewport down)
   */
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      // Default: scroll down one viewport height
      window.scrollTo({ 
        top: window.innerHeight, 
        behavior: 'smooth' 
      });
    }
  };
  
  return (
    <section className="
      h-screen relative
      flex items-center justify-center
      overflow-hidden
      mt-20
    ">
      {/* Background Gradient */}
      <div className="
        absolute top-0 left-0 w-full h-full
        bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d]
        z-0
      "></div>
      
      {/* Diagonal Pattern Overlay */}
      <div 
        className="absolute top-0 left-0 w-full h-full opacity-[0.03] z-0"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212, 165, 116, 0.5) 35px, rgba(212, 165, 116, 0.5) 70px)'
        }}
        aria-hidden="true"
      ></div>
      
      {/* Hero Content */}
      <div className="
        relative z-[2]
        text-center text-white
        max-w-[1000px] px-8
        animate-fadeInUp
      ">
        {/* Title with Line Break Support */}
        <h1 className="
          font-[family-name:var(--font-family-playfair)]
          text-[6rem] md:text-[6rem] hero-title-mobile
          font-black leading-[1.1]
          mb-6 tracking-[-2px]
          animate-fadeInUp-delayed-1
        ">
          {title.split('<br/>').map((line, i) => (
            <span key={i}>
              {line}
              {i < title.split('<br/>').length - 1 && <br />}
            </span>
          ))}
        </h1>
        
        {/* Subtitle */}
        <p className="
          text-[1.3rem] hero-subtitle-mobile
          font-light
          text-white/80
          mb-12 tracking-[2px]
          uppercase
          animate-fadeInUp-delayed-2
        ">
          {subtitle}
        </p>
        
        {/* CTA Button */}
        <div className="animate-fadeInUp-delayed-3">
          <button 
            onClick={handleCtaClick}
            className="
              bg-[#d4a574] text-white
              px-12 py-4
              border-none rounded-[2px]
              font-semibold cursor-pointer
              transition-all duration-300
              uppercase tracking-wider text-base
              
              hover:bg-[#1a1a1a]
              hover:-translate-y-0.5
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
            "
          >
            {ctaText}
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="
        absolute bottom-12 left-1/2
        -translate-x-1/2
        text-white text-[0.85rem]
        tracking-[2px] uppercase
        animate-bounce-slow
      "
      aria-label="Scroll down for more content"
      >
        Scroll Down ↓
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaText: PropTypes.string,
  onCtaClick: PropTypes.func,
};

export default HeroSection;
