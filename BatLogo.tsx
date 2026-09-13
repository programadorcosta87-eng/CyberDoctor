import React from 'react';
import batImage from '../assets/images/realistic_black_bat_logo_1788175782600.jpg';

export const BatLogo = ({ className = "w-8 h-8" }: { className?: string }) => (
  <img 
    src={batImage} 
    alt="CyberDoctor Bat Logo" 
    className={`object-cover rounded-full shadow-[0_0_15px_rgba(0,255,65,0.2)] mix-blend-screen ${className}`} 
    referrerPolicy="no-referrer"
  />
);
