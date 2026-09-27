import React from 'react';

interface VenaLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'colorful';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const VenaLogo: React.FC<VenaLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'h-8',
    md: 'h-16',
    lg: 'h-20',
    xl: 'h-28',
  };

  const src = variant === 'light' ? '/vena-logo-light.png' : '/vena-logo-dark.png';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <img
        src={src}
        alt="Vena Studio logo"
        className={`${sizeMap[size]} w-auto object-contain transition-transform duration-200`}
      />
    </div>
  );
};
