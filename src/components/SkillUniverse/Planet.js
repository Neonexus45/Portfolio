import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { getCategoryColor } from '../../data/skills';

const Planet = ({ 
  name, 
  icon: IconComponent, 
  x, 
  y, 
  radius, 
  onClick, 
  isActive, 
  hasChildren, 
  depth, 
  onHover, 
  isHovered,
  children,
  language = 'en'  // Ajout du paramètre de langue
}) => {
  const color = getCategoryColor(name, language);
  const planetRef = useRef(null);
  
  // Ring animation effect
  const [ringScale, setRingScale] = useState(1);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setRingScale(prev => prev >= 1.3 ? 1 : prev + 0.01);
      }, 20);
      
      return () => clearInterval(interval);
    } else {
      setRingScale(1);
    }
  }, [isActive]);
  
  return (
    <div 
      ref={planetRef}
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        zIndex: isActive ? 50 : (isHovered ? 40 : 30)
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Planet ring */}
      {(isActive || isHovered) && (
        <div 
          className="absolute rounded-full border-2 opacity-50 transition-transform duration-1000"
          style={{ 
            width: `${radius * 2.2}px`, 
            height: `${radius * 2.2}px`,
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) scale(${ringScale})`,
            borderColor: color.primary
          }}
        />
      )}
      
      {/* Glow effect */}
      <div 
        className={`absolute rounded-full transition-all duration-500 filter blur-md ${isActive || isHovered ? 'opacity-80' : 'opacity-30'}`}
        style={{ 
          width: `${radius * 2.1}px`, 
          height: `${radius * 2.1}px`,
          backgroundColor: color.glow,
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
      
      {/* Planet body */}
      <div 
        className={`rounded-full shadow-lg flex flex-col items-center justify-center relative transition-all duration-500 ${
          (isActive || isHovered) ? 'border-2 border-white/50' : 'border border-white/20'
        }`}
        style={{ 
          width: `${radius * 2}px`, 
          height: `${radius * 2}px`,
          background: `radial-gradient(circle at 30% 30%, ${color.primary}, ${color.secondary})`,
          boxShadow: (isActive || isHovered) ? `0 0 30px ${color.glow}` : 'none',
          transform: isActive ? 'scale(1.1)' : isHovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}
      >
        {/* Icon */}
        {IconComponent && (
          <IconComponent 
            size={radius * 0.8} 
            className={`text-white ${isActive ? 'opacity-100' : 'opacity-80'}`} 
          />
        )}
        
        {/* Planet name */}
        {(depth <= 2 || isActive || isHovered) && (
          <span 
            className={`text-white font-bold text-center px-1 ${
              depth === 0 ? 'text-xl' : depth === 1 ? 'text-base' : 'text-sm'
            } ${(isActive || isHovered) ? 'opacity-100' : 'opacity-80'}`}
          >
            {name}
          </span>
        )}
        
        {/* Plus icon for expandable nodes */}
        {hasChildren && !isActive && !isHovered && depth > 1 && (
          <div className="absolute top-0 right-0 bg-white/20 rounded-full transform translate-x-1/4 -translate-y-1/4">
            <Plus size={16} className="text-white" />
          </div>
        )}
      </div>
      
      {/* Children */}
      {children}
    </div>
  );
};

export default Planet; 