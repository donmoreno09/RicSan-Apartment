/**
 * Footer Component (Organism)
 * 
 * Main footer with contact information and site navigation.
 * Includes smooth scroll to top functionality.
 */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  /**
   * Scroll to top of page
   * Uses native Smooth Scroll API
   */
  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: 'smooth' 
    });
  };
  
  return (
    <footer className={`bg-[#1a1a1a] text-white py-16 px-8 border-t border-[#d4a574]/20 ${className}`}>
      <div className="max-w-[1400px] mx-auto">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="
              font-[family-name:var(--font-family-playfair)]
              text-[1.3rem] font-bold
              text-[#d4a574] mb-6
            ">
              RicSan's Apartments
            </h3>
            <p className="text-white/70 leading-relaxed">
              Premium apartments designed for modern urban lifestyles. Your perfect home awaits.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="
              font-[family-name:var(--font-family-playfair)]
              text-[1.3rem] font-bold
              text-[#d4a574] mb-6
            ">
              Quick Links
            </h3>
            <ul className="space-y-3 list-none">
              <li>
                <Link 
                  to="/"
                  className="text-white/70 hover:text-[#d4a574] transition-colors no-underline"
                >
                  View Apartments
                </Link>
              </li>
              <li>
                <button
                  onClick={scrollToTop}
                  className="
                    text-white/70 hover:text-[#d4a574] 
                    transition-colors bg-transparent 
                    border-none cursor-pointer
                    p-0 font-[family-name:var(--font-family-dmsans)]
                  "
                >
                  Back to Top ↑
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="
              font-[family-name:var(--font-family-playfair)]
              text-[1.3rem] font-bold
              text-[#d4a574] mb-6
            ">
              Contact
            </h3>
            <ul className="space-y-3 list-none text-white/70">
              <li>123 Urban Street</li>
              <li>City Center, ST 12345</li>
              <li>
                <a 
                  href="tel:+15551234567" 
                  className="text-white/70 hover:text-[#d4a574] transition-colors no-underline"
                >
                  Phone: (555) 123-4567
                </a>
              </li>
              <li>
                <a 
                  href="mailto:info@ricsan.com" 
                  className="text-white/70 hover:text-[#d4a574] transition-colors no-underline"
                >
                  Email: info@ricsan.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Hours */}
          <div>
            <h3 className="
              font-[family-name:var(--font-family-playfair)]
              text-[1.3rem] font-bold
              text-[#d4a574] mb-6
            ">
              Office Hours
            </h3>
            <ul className="space-y-3 list-none text-white/70">
              <li>Monday - Friday: 9am - 6pm</li>
              <li>Saturday: 10am - 4pm</li>
              <li>Sunday: By Appointment</li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="text-center pt-8 border-t border-white/10 text-white/50">
          <p>© {currentYear} RicSan's Apartments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;