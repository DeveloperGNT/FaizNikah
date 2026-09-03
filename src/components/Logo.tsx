import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'emerald';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'emerald',
  showText = false
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const containerClasses = sizeMap[size] || 'w-10 h-10';

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div 
        className={`${containerClasses} relative rounded-lg overflow-hidden flex items-center justify-center p-0.5 transition-transform duration-200 ${
          variant === 'light' 
            ? 'bg-[#F7F4EA] border border-[#B3A16A]/40 shadow-sm' 
            : 'bg-[#F7F4EA] border border-[#C8C5B4]/80 shadow-sm'
        }`}
      >
        <img 
          src="/logo.png" 
          alt="FaizNikah Emblem" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          loading="eager"
        />
      </div>

      {showText && (
        <div>
          <div className={`font-serif text-2xl md:text-[25px] tracking-tight leading-none font-semibold ${
            variant === 'light' ? 'text-[#B3A16A]' : 'text-[#0B4940]'
          }`}>
            FaizNikah
          </div>
          <span className={`text-[9.5px] tracking-widest uppercase font-semibold block mt-1 ${
            variant === 'light' ? 'text-[#C8C5B4]/80' : 'text-[#526333]/90'
          }`}>
            Sacred Matrimonial Sanctuary
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
