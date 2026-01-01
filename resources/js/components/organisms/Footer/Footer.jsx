/**
 * Footer Component (Organism) - Enhanced Design
 */

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = {
    quickLinks: [
      { path: '/apartments', label: 'Available Apartments' },
      { path: '/amenities', label: 'Amenities' },
      { path: '/location', label: 'Location' },
      { path: '/contact', label: 'Contact Us' },
    ],
    contact: [
      { label: '123 Urban Street' },
      { label: 'City Center, ST 12345' },
      { label: 'Phone: (555) 123-4567' },
      { label: 'Email: info@ricsan.com' },
    ],
    hours: [
      { label: 'Monday - Friday: 9am - 6pm' },
      { label: 'Saturday: 10am - 4pm' },
      { label: 'Sunday: By Appointment' },
    ],
  };
  
  return (
    <footer className={`bg-[--color-primary] text-gray-300 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <h3 className="
              font-[family-name:--font-family-playfair] 
              text-2xl font-bold 
              text-white 
              mb-4
            ">
              RicSan's Apartments
            </h3>
            <p className="text-white/70 leading-relaxed">
              Premium apartments designed for modern urban lifestyles. Your perfect home awaits.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="
              font-[family-name:--font-family-playfair] 
              text-lg font-semibold 
              text-white 
              mb-4
            ">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="
                      text-white/70 
                      hover:text-[--color-accent] 
                      transition-colors duration-200
                    "
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="
              font-[family-name:--font-family-playfair] 
              text-lg font-semibold 
              text-white 
              mb-4
            ">
              Contact
            </h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((item, index) => (
                <li key={index} className="text-white/70">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Office Hours */}
          <div>
            <h4 className="
              font-[family-name:--font-family-playfair] 
              text-lg font-semibold 
              text-white 
              mb-4
            ">
              Office Hours
            </h4>
            <ul className="space-y-3">
              {footerLinks.hours.map((item, index) => (
                <li key={index} className="text-white/70">
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              © {currentYear} RicSan's Apartments. All rights reserved. | Privacy Policy | Terms of Service
            </p>
            <div className="flex gap-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[--color-accent] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[--color-accent] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[--color-accent] transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

Footer.defaultProps = {
  className: '',
};

export default Footer;