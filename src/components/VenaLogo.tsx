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

  const textColor =
    variant === 'light' ? 'text-white fill-white' : 'text-zinc-950 fill-zinc-950';

  return (
    <div className={`inline-flex flex-col items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 700 260"
        className={`${sizeMap[size]} w-auto ${textColor} transition-transform duration-200`}
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Vena Studio logo"
      >
        <text
          x="40"
          y="150"
          fontSize="170"
          fontWeight="900"
          letterSpacing="-12"
          fontFamily="'Arial Rounded MT Bold', 'Avenir Next Rounded', 'Trebuchet MS', sans-serif"
          fill="currentColor"
          style={{ fontVariantLigatures: 'none' }}
        >
          vena
        </text>
        <text
          x="118"
          y="220"
          fontSize="56"
          fontWeight="400"
          letterSpacing="10"
          fontFamily="'Avenir Next', 'Segoe UI', sans-serif"
          fill="currentColor"
          opacity="0.9"
        >
          STUDIO
        </text>
      </svg>
    </div>
  );
};
