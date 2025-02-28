import React from 'react';

const OrbitLine = ({ centerX, centerY, radius, isActive }) => {
  return (
    <div 
      className="absolute transition-transform duration-75 ease-out"
      style={{
        width: radius * 2,
        height: radius * 2,
        left: centerX - radius,
        top: centerY - radius,
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        opacity: isActive ? 1 : 0.5,
        transform: `translate3d(0, 0, 0)`,
        willChange: 'transform'
      }}
    />
  );
};

export default OrbitLine; 