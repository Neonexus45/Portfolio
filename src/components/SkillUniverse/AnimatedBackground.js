import React from 'react';
import { random } from './utils';

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      {/* Darker background for true dark mode */}
      <div className="absolute inset-0 bg-[#030712]"></div>
      
      {/* Animated gradient orbs with lower opacity */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-900/10 filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-900/10 filter blur-3xl animate-pulse"></div>
      
      {/* Star field with more stars for depth */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              width: `${random(1, i % 20 === 0 ? 3 : 2)}px`,
              height: `${random(1, i % 20 === 0 ? 3 : 2)}px`,
              top: `${random(0, 100)}%`,
              left: `${random(0, 100)}%`,
              opacity: random(0.3, 0.7),
              animationDuration: `${random(3, 8)}s`
            }}
          />
        ))}
      </div>
      
      {/* Subtle nebula effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-2/3 h-2/3 rounded-full bg-indigo-500/20 filter blur-[100px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 rounded-full bg-purple-500/20 filter blur-[80px]"></div>
      </div>
    </div>
  );
};

export default AnimatedBackground; 