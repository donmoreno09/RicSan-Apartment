import PropTypes from 'prop-types';

const Badge = ({ status, className = '' }) => {
  const baseClasses = `
    absolute top-4 right-4
    px-4 py-2
    text-[0.75rem] font-semibold
    uppercase tracking-wider
    rounded-[2px]
  `;
  
  const statusClasses = {
    available: 'bg-[#d4a574] text-white',
    rented: 'bg-[#999999] text-white',
  };
  
  return (
    <span className={`${baseClasses} ${statusClasses[status]} ${className}`}>
      {status === 'available' ? 'Available' : 'Rented'}
    </span>
  );
};

Badge.propTypes = {
  status: PropTypes.oneOf(['available', 'rented']).isRequired,
  className: PropTypes.string,
};

export default Badge;