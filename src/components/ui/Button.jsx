import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Button and Link component with Evercore-inspired styling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - Additional CSS classes
 * @param {'primary'|'secondary'|'outline'|'text'} props.variant - Button style variant
 * @param {'sm'|'md'|'lg'} props.size - Button size
 * @param {string} props.to - Link destination (optional, renders as Link if provided)
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {string} props.type - Button type (button, submit, reset)
 */
const Button = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'md',
  to = null,
  fullWidth = false,
  onClick = null,
  disabled = false,
  type = 'button',
  ...props
}) => {
  // Define base classes
  const baseClasses = `
    inline-flex items-center justify-center
    font-medium transition-all duration-200
    focus:outline-none
    ${fullWidth ? 'w-full' : ''}
    ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
  `;

  // Size classes
  const sizeClasses = {
    sm: 'text-xs py-1 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5'
  };

  // Variant classes - more conservative styling
  const variantClasses = {
    primary: `
      bg-evercore-accent-blue hover:bg-evercore-navy-700
      text-white 
      border border-transparent
    `,
    secondary: `
      bg-evercore-gray-100 hover:bg-evercore-gray-200
      text-evercore-navy-700
      border border-evercore-gray-300
      dark:bg-evercore-navy-700 dark:hover:bg-evercore-navy-600
      dark:text-white dark:border-evercore-navy-600
    `,
    outline: `
      bg-transparent hover:bg-evercore-gray-50
      text-evercore-navy-700 
      border border-evercore-navy-700
      dark:text-evercore-navy-300 dark:border-evercore-navy-500
      dark:hover:bg-evercore-navy-800/50
    `,
    text: `
      bg-transparent 
      text-evercore-accent-blue hover:text-evercore-navy-700
      border border-transparent
      dark:text-evercore-navy-300 dark:hover:text-white
      p-0 underline-offset-2 hover:underline
    `
  };

  // Combine classes
  const combinedClasses = `
    ${baseClasses}
    ${sizeClasses[size] || sizeClasses.md}
    ${variantClasses[variant] || variantClasses.primary}
    ${className}
  `;

  // Render as link if "to" prop is provided
  if (to) {
    return (
      <Link 
        to={to} 
        className={combinedClasses}
        {...props}
      >
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button 
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
