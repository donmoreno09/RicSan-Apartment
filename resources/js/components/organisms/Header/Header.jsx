/**
 * Header Component (Organism) - Enhanced Design
 * 
 * Frosted glass navigation with backdrop blur matching design reference.
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button';

const Header = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apartments', label: 'Apartments' },
    { path: '/amenities', label: 'Amenities' },
    { path: '/contact', label: 'Contact' },
  ];
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <header className={`
      fixed top-0 left-0 right-0 z-50
      bg-white/95 backdrop-blur-10
      border-b border-[--color-accent]/10
      transition-all duration-300
      ${className}
    `}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link 
            to="/" 
            className="
              font-[family-name:--font-family-playfair] 
              text-[1.8rem] font-bold 
              text-[--color-primary]
              tracking-tight
              hover:text-[--color-accent]
              transition-colors duration-300
            "
          >
            RicSan's Apartments
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative
                  font-medium text-[0.95rem]
                  transition-colors duration-300
                  ${isActive(link.path) 
                    ? 'text-[--color-accent]' 
                    : 'text-[--color-primary] hover:text-[--color-accent]'
                  }
                  after:content-[''] 
                  after:absolute 
                  after:bottom-[-5px] 
                  after:left-0 
                  after:h-[2px] 
                  after:bg-[--color-accent]
                  after:transition-all
                  after:duration-300
                  ${isActive(link.path) ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
                `}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="primary" size="small" className="uppercase tracking-wider">
              Schedule Tour
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="
              md:hidden 
              p-2 rounded-lg 
              hover:bg-black/5 
              transition-colors
            "
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-6 border-t border-[--color-accent]/10">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    font-medium py-2
                    transition-colors duration-300
                    ${isActive(link.path) 
                      ? 'text-[--color-accent]' 
                      : 'text-[--color-primary] hover:text-[--color-accent]'
                    }
                  `}
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" size="small" className="w-full uppercase tracking-wider">
                Schedule Tour
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: '',
};

export default Header;