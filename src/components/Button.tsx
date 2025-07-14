import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  type?: 'number' | 'operator' | 'action' | 'equals';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'number',
  disabled = false
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsPressed(true);
      onClick();
      setTimeout(() => setIsPressed(false), 100);
    }
  };

  const baseClasses = `
    h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20
    rounded-xl 
    font-medium text-lg sm:text-2xl md:text-3xl
    transition-all duration-150 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-98
    shadow-md hover:shadow-lg
    border border-gray-200
    ${isPressed ? 'transform scale-98' : ''}
    ${className.includes('col-span-2') ? 'rounded-xl w-28 sm:w-36 md:w-44' : ''}
  `;
  
  const typeClasses = {
    number: `
      bg-white hover:bg-gray-50 
      text-gray-800
      border-gray-200 hover:border-gray-300
    `,
    operator: `
      bg-blue-200 hover:bg-blue-300 
      text-blue-800
      border-blue-200 hover:border-blue-300
    `,
    action: `
      bg-red-200 hover:bg-red-300 
      text-red-800
      border-red-200 hover:border-red-300
    `,
    equals: `
      bg-green-200 hover:bg-green-300 
      text-green-800
      border-green-200 hover:border-green-300
    `
  };
  
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
      role="button"
      tabIndex={0}
    >
      {children}
    </button>
  );
};