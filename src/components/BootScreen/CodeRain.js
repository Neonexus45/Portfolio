import React from 'react';

const CodeRain = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
  const getRandomChar = () => chars.charAt(Math.floor(Math.random() * chars.length));
  
  const columns = Array.from({ length: 50 }, () => ({
    chars: Array.from({ length: 15 }, () => getRandomChar()),
    speed: Math.random() * 0.5 + 0.2,
    y: Math.random() * -100
  }));
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-10">
      <svg width="100%" height="100%">
        {columns.map((col, colIdx) => (
          <g key={colIdx} className="text-green-400" style={{ 
            transform: `translateX(${colIdx * 20}px)`, 
            opacity: Math.random() * 0.5 + 0.3 
          }}>
            {col.chars.map((char, charIdx) => (
              <text
                key={charIdx}
                x="0"
                y={`${(col.y + charIdx * 20) % 1000}px`}
                fontSize="12"
                fontFamily="monospace"
                fill="currentColor"
                className="code-char"
              >
                {char}
              </text>
            ))}
          </g>
        ))}
      </svg>
      
      <style jsx>{`
        .code-char {
          animation: fade 2s infinite alternate;
        }
        
        @keyframes fade {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default CodeRain; 