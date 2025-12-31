/**
 * Button Component (Atom) - Tailwind v4
 * 
 * Reusable button with Tailwind CSS v4 utility classes.
 * Supports 3 variants and 3 sizes.
 */

import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  onClick, 
  disabled = false,
  type = 'button',
  className = ''
}) => {
  // Base classes - applied to all buttons
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-medium uppercase tracking-wide
    rounded-lg
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  // Variant classes using Tailwind v4 custom property syntax
  const variantClasses = {
    primary: `
      bg-gradient-to-br from-[--color-gold] to-[--color-gold-dark]
      text-[--color-charcoal]
      hover:from-[--color-gold-light] hover:to-[--color-gold]
      hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[--color-gold]
      active:translate-y-0
    `,
    secondary: `
      bg-[--color-charcoal-light]
      text-[--color-gold]
      hover:bg-[--color-charcoal-lighter]
      hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[--color-gold]
      active:translate-y-0
    `,
    outline: `
      bg-transparent
      border-2 border-[--color-gold]
      text-[--color-gold]
      hover:bg-[--color-gold]/10 hover:border-[--color-gold-light] hover:text-[--color-gold-light]
      hover:shadow-lg hover:-translate-y-0.5
      focus:ring-[--color-gold]
      active:translate-y-0
    `,
  };
  
  // Size classes
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    medium: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };
  
  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim().replace(/\s+/g, ' ');
  
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
};

Button.defaultProps = {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  type: 'button',
  className: '',
};

export default Button;
