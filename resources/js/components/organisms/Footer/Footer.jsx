import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Footer = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();
  
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
              {[
                { path: '/apartments', label: 'Available Apartments' },
                { path: '/amenities', label: 'Amenities' },
                { path: '/contact', label: 'Contact Us' }
              ].map(link => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/70 hover:text-[#d4a574] transition-colors no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
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
              <li>Phone: (555) 123-4567</li>
              <li>Email: info@ricsan.com</li>
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
          <p>© {currentYear} RicSan's Apartments. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;