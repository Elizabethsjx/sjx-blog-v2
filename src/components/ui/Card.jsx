import React from 'react';

/**
 * Reusable card component with Evercore-inspired styling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether to apply hover effects
 * @param {boolean} props.bordered - Whether to show border
 */
const Card = ({ 
  children, 
  className = '', 
  hover = false,
  bordered = true
}) => {
  return (
    <div 
      className={`
        bg-white dark:bg-evercore-navy-800 
        ${bordered ? 'border border-evercore-gray-200 dark:border-evercore-gray-700' : ''} 
        ${hover ? 'hover:shadow-sm transition-shadow duration-200' : ''}
        ${className}
      `}
      style={{
        backgroundColor: 'var(--color-card-bg)',
        borderColor: bordered ? 'var(--color-card-border)' : 'transparent'
      }}
    >
      {children}
    </div>
  );
};

export default Card;
