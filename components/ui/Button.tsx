import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
  variant?: 'outline' | 'solid';
}

export const Button: React.FC<ButtonProps> = ({ text, onClick, className = '', variant = 'outline' }) => {
  const baseStyles = "group relative uppercase tracking-widest text-xs font-bold py-4 px-8 flex items-center gap-4 transition-all duration-300";
  
  const variants = {
    outline: "border border-white/30 text-white hover:bg-white hover:text-black",
    solid: "bg-[#FF3B30] text-white border border-[#FF3B30] hover:bg-white hover:text-[#FF3B30] hover:border-white"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <span>{text}</span>
      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </button>
  );
};