import React from 'react';
import { sound } from '../../utils/audio';

interface AppleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glow' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const AppleButton: React.FC<AppleButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  children,
  onClick,
  className = '',
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sound.playHapticClick(1200, 0.015);
    if (onClick) onClick(e);
  };

  const baseStyles =
    'relative inline-flex items-center justify-center font-semibold tracking-tight transition-all duration-200 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 active:scale-[0.96] rounded-full disabled:opacity-40 disabled:pointer-events-none';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-xs sm:text-sm gap-2',
    lg: 'px-7 py-3.5 text-sm sm:text-base gap-2.5',
    xl: 'px-9 py-4 text-base sm:text-lg gap-3',
  };

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-[#f5f5f7] shadow-[0_2px_12px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.35)]',
    secondary:
      'bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.12] backdrop-blur-md',
    glow:
      'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.35)] hover:shadow-[0_0_50px_rgba(255,255,255,0.6)] border border-white/50',
    glass:
      'bg-white/[0.04] hover:bg-white/[0.09] text-white border border-white/[0.15] backdrop-blur-xl shadow-lg',
  };

  return (
    <button
      onClick={handleClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
