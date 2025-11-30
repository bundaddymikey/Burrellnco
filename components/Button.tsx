import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  to?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  to, 
  onClick, 
  className = '',
  type = 'button',
  fullWidth = false
}) => {
  
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-bold transition-all duration-300 rounded-full tracking-wider uppercase transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-gold/50 font-sans";
  
  const variants = {
    primary: "bg-brand-gold text-black hover:bg-yellow-400 shadow-[0_0_20px_rgba(255,195,0,0.3)] hover:shadow-[0_0_30px_rgba(255,195,0,0.5)]",
    secondary: "bg-white text-black hover:bg-gray-100",
    outline: "border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-black"
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const combinedClasses = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
};