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
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-sm
    transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-[--color-accent] focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const variantClasses = {
    primary: `
      bg-[--color-accent]
      text-white
      hover:bg-[--color-primary]
      hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)]
      hover:-translate-y-0.5
      active:translate-y-0
    `,
    secondary: `
      bg-[--color-primary-light]
      text-white
      hover:bg-[--color-accent]
      hover:shadow-lg hover:-translate-y-0.5
      active:translate-y-0
    `,
    outline: `
      bg-transparent
      border-2 border-[--color-primary]
      text-[--color-primary]
      hover:bg-[--color-primary]
      hover:text-white
      hover:shadow-lg hover:-translate-y-0.5
      active:translate-y-0
    `,
  };
  
  const sizeClasses = {
    small: 'px-8 py-3 text-[0.85rem]',
    medium: 'px-10 py-3 text-[0.9rem]',
    large: 'px-12 py-4 text-[0.9rem]',
  };
  
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

export default Button;