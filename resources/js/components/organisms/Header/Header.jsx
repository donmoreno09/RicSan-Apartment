import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Header = ({ className = '' }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/apartments', label: 'Apartments' },
    { path: '/amenities', label: 'Amenities' },
    { path: '/contact', label: 'Contact' },
  ];
  
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
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`
                  relative no-underline
                  font-medium text-[0.95rem]
                  transition-colors duration-300
                  ${isActive(link.path) ? 'text-[#d4a574]' : 'text-[#1a1a1a]'}
                  hover:text-[#d4a574]
                  
                  after:content-['']
                  after:absolute
                  after:bottom-[-5px]
                  after:left-0
                  after:h-[2px]
                  after:bg-[#d4a574]
                  after:transition-all
                  after:duration-300
                  ${isActive(link.path) ? 'after:w-full' : 'after:w-0'}
                  hover:after:w-full
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
          
          {/* CTA Button */}
          <li>
            <button className="
              bg-[#d4a574] text-white
              px-8 py-3
              border-none rounded-[2px]
              font-semibold cursor-pointer
              transition-all duration-300
              uppercase tracking-wider text-[0.85rem]
              
              hover:bg-[#1a1a1a]
              hover:-translate-y-0.5
              hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
            ">
              Schedule Tour
            </button>
          </li>
        </ul>
        
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#d4a574]/10 px-8 py-4">
          <ul className="flex flex-col gap-4 list-none">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    no-underline font-medium
                    ${isActive(link.path) ? 'text-[#d4a574]' : 'text-[#1a1a1a]'}
                  `}
                >
                  {link.label}
                </Link>
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