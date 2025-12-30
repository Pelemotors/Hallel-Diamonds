import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  asChild = false,
  ...props
}) => {
  const baseStyles = 'font-body font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center';
  
  const variantStyles = {
    primary: 'bg-gold hover:bg-gold-hover text-text-primary focus:ring-gold',
    secondary: 'bg-background border-2 border-text-primary text-text-primary hover:bg-surface focus:ring-text-primary',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-button',
    lg: 'px-8 py-4 text-lg',
  };
  
  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;
  
  if (asChild && 'href' in props) {
    return (
      <Link href={props.href as string} className={combinedClassName} {...(props as any)}>
        {children}
      </Link>
    );
  }
  
  return (
    <button
      className={combinedClassName}
      {...props}
    >
      {children}
    </button>
  );
};

