import React from 'react';

/**
 * Animated background component with floating particles
 */
const AnimatedBackground = () => {
  // Generate 15 random floating particles
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Dark background */}
      <div className="absolute w-full h-full bg-gray-950" />
      
      {/* Random animated particles */}
      {[...Array(15)].map((_, i) => {
        // Random size, position, and animation timing for each particle
        const size = Math.random() * 200 + 50;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        return (
          <div
            key={i}
            className="absolute rounded-full opacity-5 bg-purple-600 animate-pulse"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${posX}%`,
              top: `${posY}%`,
              animationDuration: `${20 + Math.random() * 10}s`,
              animationDelay: `${-Math.random() * 5}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
