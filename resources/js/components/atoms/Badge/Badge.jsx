/**
 * Badge Component (Atom)
 * 
 * Status badges for apartments using Tailwind CSS.
 */

import PropTypes from 'prop-types';

const Badge = ({ status, className = '' }) => {
  const baseClasses = `
    inline-flex items-center justify-center
    px-3 py-1.5
    font-dmsans font-semibold text-xs uppercase tracking-wide
    rounded-full border
    transition-transform duration-200
    hover:scale-105
  `;
  
  const statusClasses = {
    available: 'bg-green-50 text-green-700 border-green-500',
    rented: 'bg-red-50 text-red-700 border-red-500',
  };
  
  const displayText = status === 'available' ? 'Available' : 'Rented';
  
  const badgeClasses = `
    ${baseClasses}
    ${statusClasses[status]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return <span className={badgeClasses}>{displayText}</span>;
};

Badge.propTypes = {
  status: PropTypes.oneOf(['available', 'rented']).isRequired,
  className: PropTypes.string,
};

Badge.defaultProps = {
  className: '',
};

export default Badge;
