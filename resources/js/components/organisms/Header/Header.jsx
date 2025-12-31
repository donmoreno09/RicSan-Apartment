/**
 * Header Component (Organism)
 * 
 * Main navigation header with logo and responsive menu.
 * Combines multiple atoms/molecules into site header.
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button/Button';

const Header = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apartments', label: 'Apartments' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];
  
  return (
    <header className={`bg-white shadow-md sticky top-0 z-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-[family-name:--font-family-playfair] text-2xl font-bold text-[--color-charcoal] hover:text-[--color-gold] transition-colors"
          >
            <span className="text-[--color-gold]">🏢</span>
            RicSan's Apartments
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-[--color-charcoal] hover:text-[--color-gold] font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="primary" size="small">
              Schedule Tour
            </Button>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-[--color-charcoal] hover:text-[--color-gold] font-medium py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Button variant="primary" size="small" className="w-full">
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
