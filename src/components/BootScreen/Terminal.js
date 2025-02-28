import React, { forwardRef } from 'react';
import LanguageSelector from './LanguageSelector';

const Terminal = forwardRef(({ displayedLogs, showLanguageSelect, onLanguageSelect }, ref) => {
  const renderLogMessage = (item, index, isPartOfThunderfury = false) => {
    if (item.type === 'item') {
      return (
        <a 
          href="https://www.wowhead.com/item=19019/thunderfury-blessed-blade-of-the-windseeker"
          target="_blank"
          rel="noopener noreferrer"
          key={index} 
          className="text-orange-400 hover:text-orange-300 underline cursor-pointer"
        >
          {item.text}
        </a>
      );
    }
    
    const className = item.type === 'system' ? 'text-green-400' : 'text-white';
    
    return (
      <div key={index} className={`${className} mb-1`}>
        {item.type === 'system' && <span className="text-gray-500">[SYS]</span>} {item.text}
        {isPartOfThunderfury && index + 1 < displayedLogs.length && (
          <>
            <a 
              href="https://www.wowhead.com/item=19019/thunderfury-blessed-blade-of-the-windseeker"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline cursor-pointer ml-1"
            >
              {displayedLogs[index + 1].text}
            </a>
            {displayedLogs[index + 2]?.text}
          </>
        )}
      </div>
    );
  };
  
  const renderMessages = () => {
    return displayedLogs.map((item, index) => {
      if (item.text === 'Did somebody say ') {
        return renderLogMessage(item, index, true);
      }
      if (index > 0 && displayedLogs[index - 1].text === 'Did somebody say ') {
        return null;
      }
      if (index > 1 && displayedLogs[index - 2].text === 'Did somebody say ') {
        return null;
      }
      return renderLogMessage(item, index);
    }).filter(Boolean);
  };

  return (
    <div className="flex-grow bg-gray-900/60 backdrop-blur-md p-6 overflow-hidden relative border-l border-r border-gray-700">
      <div 
        ref={ref}
        className="font-mono text-sm h-full overflow-y-auto pr-2 terminal-scrollbar"
      >
        {renderMessages()}
        
        <div className="text-green-400">
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse"></span>
        </div>
        
        {showLanguageSelect && (
          <LanguageSelector onLanguageSelect={onLanguageSelect} />
        )}
      </div>
      
      <style jsx>{`
        .terminal-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .terminal-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }
        
        .terminal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 3px;
        }
      `}</style>
    </div>
  );
});

Terminal.displayName = 'Terminal';

export default Terminal; 