import React from 'react';
import { Zap } from 'lucide-react';
import content from '../../data/content';

const Star = ({ 
  name, 
  level, 
  x, 
  y, 
  color = {
    primary: "#6366f1",
    secondary: "#4f46e5",
    glow: "rgba(99, 102, 241, 0.5)"
  }, 
  onClick, 
  isActive, 
  isHovered, 
  onHover,
  language = 'en'
}) => {
  const starSize = 10 + level * 5; // Size based on skill level
  const text = content[language].skillUniverse.levels;
  
  const getSkillLevelDescription = (level) => {
    return text[level] || text.default;
  };
  
  // Ensure color object has all required properties
  const safeColor = {
    primary: color?.primary || "#6366f1",
    secondary: color?.secondary || "#4f46e5",
    glow: color?.glow || "rgba(99, 102, 241, 0.5)"
  };
  
  return (
    <div 
      className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
      style={{ 
        left: `${x}px`, 
        top: `${y}px`, 
        zIndex: isActive ? 60 : (isHovered ? 55 : 45)
      }}
      onClick={onClick}
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
    >
      {/* Skill level visualization */}
      {[...Array(level)].map((_, i) => (
        <div 
          key={i} 
          className={`absolute rounded-full ${isActive || isHovered ? 'animate-pulse' : ''}`}
          style={{ 
            width: `${starSize + i * 10}px`, 
            height: `${starSize + i * 10}px`, 
            backgroundColor: safeColor.primary,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: (isActive || isHovered) ? 0.3 - i * 0.04 : 0.15 - i * 0.02,
            animationDuration: `${1 + i * 0.5}s`
          }}
        />
      ))}
      
      {/* Main star */}
      <div 
        className={`rounded-full shadow-lg flex items-center justify-center transition-all duration-300`}
        style={{ 
          width: `${starSize}px`, 
          height: `${starSize}px`,
          background: (isActive || isHovered)
            ? `radial-gradient(circle at 30% 30%, white, ${safeColor.primary})` 
            : `radial-gradient(circle at 30% 30%, ${safeColor.primary}, ${safeColor.secondary})`,
          boxShadow: (isActive || isHovered) ? `0 0 20px ${safeColor.primary}` : `0 0 10px ${safeColor.glow}`,
          transform: (isActive || isHovered) ? 'scale(1.2)' : 'scale(1)',
          zIndex: 2
        }}
      />
      
      {/* Tooltip */}
      {(isActive || isHovered) && (
        <div 
          className="absolute whitespace-nowrap bg-gray-900/95 backdrop-blur-sm text-white rounded-lg px-4 py-3 shadow-lg z-40 transform -translate-y-16 transition-all duration-300 border border-white/20"
          style={{
            boxShadow: `0 4px 20px ${safeColor.glow}`
          }}
        >
          <div className="font-bold text-base mb-1">{name}</div>
          <div className="text-xs text-gray-300 mb-2">{getSkillLevelDescription(level)}</div>
          <div className="flex items-center justify-center">
            {[...Array(5)].map((_, i) => (
              <Zap 
                key={i} 
                size={14} 
                className={`mx-0.5 ${i < level ? "text-yellow-400" : "text-gray-600"}`} 
                fill={i < level ? "#fbbf24" : "transparent"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Star; 