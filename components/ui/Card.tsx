
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  const isClickable = !!onClick;
  const cardClasses = `
    bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6
    ${isClickable ? 'cursor-pointer transition-all duration-300 hover:border-cyan-500/50 hover:bg-slate-800 hover:-translate-y-1' : ''}
    ${className}
  `;
  
  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
};
