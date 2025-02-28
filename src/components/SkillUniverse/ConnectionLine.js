import React from 'react';

const ConnectionLine = ({ x1, y1, x2, y2, color, pulse = false }) => {
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
  return (
    <div 
      className={`absolute origin-left ${pulse ? 'border-2' : 'border'}`}
      style={{ 
        left: `${x1}px`, 
        top: `${y1}px`, 
        width: `${length}px`, 
        height: '2px',
        backgroundColor: color,
        opacity: pulse ? 0.7 : 0.5,
        transform: `rotate(${angle}deg)`,
        transition: 'opacity 0.3s ease',
        zIndex: 1
      }}
    />
  );
};

export default ConnectionLine; 