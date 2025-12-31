/**
 * Input Component (Atom)
 * 
 * Text input with validation states using Tailwind CSS.
 */

import PropTypes from 'prop-types';

const Input = ({ 
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error,
  success = false,
  className = '',
  ...rest
}) => {
  const baseClasses = `
    w-full px-4 py-3
    font-dmsans text-base
    bg-white border-2 rounded-lg
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-1
    placeholder:text-gray-400
    disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60
  `;
  
  const stateClasses = error 
    ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
    : success 
    ? 'border-green-500 focus:border-green-500 focus:ring-green-200' 
    : 'border-gray-300 focus:border-gold focus:ring-gold/20';
  
  const inputClasses = `
    ${baseClasses}
    ${stateClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClasses}
        {...rest}
      />
      {error && (
        <span className="text-sm text-red-500 mt-1">{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  success: PropTypes.bool,
  className: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
  placeholder: '',
  success: false,
  className: '',
};

export default Input;
