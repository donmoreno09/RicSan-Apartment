/**
 * Header Component (Organism)
 * 
 * Main navigation header with sticky positioning.
 * Features simplified navigation (Home + Contact scroll).
 *
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  /**
   * Scroll to footer contact section
   * Uses native Smooth Scroll API (no libraries needed)
   * 
   * @param {Event} e - Click event
   */
  const scrollToContact = (e) => {
    e.preventDefault();
    
    // Find footer element
    const footer = document.querySelector('footer');
    
    if (footer) {
      // Smooth scroll to footer
      footer.scrollIntoView({ 
        behavior: 'smooth',  // Smooth animation
        block: 'start'       // Align to top of viewport
      });
    }
    
    // Close mobile menu if open
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  /**
   * Navigation items configuration
   * Supports both route links and action buttons
   */
  const navLinks = [
    { 
      path: '/', 
      label: 'Home', 
      type: 'link' 
    },
    { 
      action: scrollToContact, 
      label: 'Contact', 
      type: 'action' 
    },
  ];
  
  /**
   * Check if route is active (for styling)
   */
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className={`
      fixed top-0 w-full z-[1000]
      bg-white/95 backdrop-blur-10
      border-b border-[#d4a574]/10
      ${className}
    `}>
      <div className="max-w-[1400px] mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          className="
            font-[family-name:var(--font-family-playfair)]
            text-[1.8rem] font-bold
            text-[#1a1a1a]
            tracking-tight
            no-underline
          "
        >
          RicSan's Apartments
        </Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-12 list-none items-center">
          {navLinks.map((item, index) => (
            <li key={index}>
              {item.type === 'link' ? (
                // Route link
                <Link
                  to={item.path}
                  className={`
                    relative no-underline
                    font-medium text-[0.95rem]
                    transition-colors duration-300
                    ${isActive(item.path) ? 'text-[#d4a574]' : 'text-[#1a1a1a]'}
                    hover:text-[#d4a574]
                    
                    after:content-['']
                    after:absolute
                    after:bottom-[-5px]
                    after:left-0
                    after:h-[2px]
                    after:bg-[#d4a574]
                    after:transition-all
                    after:duration-300
                    ${isActive(item.path) ? 'after:w-full' : 'after:w-0'}
                    hover:after:w-full
                  `}
                >
                  {item.label}
                </Link>
              ) : (
                // Action button (scroll, etc.)
                <button
                  onClick={item.action}
                  className="
                    relative bg-transparent border-none
                    font-medium text-[0.95rem]
                    text-[#1a1a1a]
                    cursor-pointer
                    transition-colors duration-300
                    hover:text-[#d4a574]
                    
                    after:content-['']
                    after:absolute
                    after:bottom-[-5px]
                    after:left-0
                    after:h-[2px]
                    after:bg-[#d4a574]
                    after:transition-all
                    after:duration-300
                    after:w-0
                    hover:after:w-full
                  "
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-2xl text-[#1a1a1a] bg-transparent border-none cursor-pointer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d4a574]/10 px-8 py-4 bg-white">
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((item, index) => (
              <li key={index}>
                {item.type === 'link' ? (
                  <Link
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`
                      no-underline font-medium block py-2
                      ${isActive(item.path) ? 'text-[#d4a574]' : 'text-[#1a1a1a]'}
                    `}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="
                      w-full text-left bg-transparent border-none
                      font-medium text-[#1a1a1a] py-2
                      cursor-pointer
                      hover:text-[#d4a574]
                      transition-colors duration-300
                    "
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

export default Header;