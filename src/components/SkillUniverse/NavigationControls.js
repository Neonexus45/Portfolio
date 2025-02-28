import React from 'react';
import { ChevronLeft } from 'lucide-react';
import content from '../../data/content';

const NavigationControls = ({ 
  activeCategory, 
  activeSubcategory, 
  activeSkill, 
  handleBackClick,
  canGoBack,
  currentPath,
  language = 'en'
}) => {
  const text = content[language].skillUniverse.navigation;

  return (
    <div className="absolute top-4 left-4 z-50 flex items-center">
      {/* Back button */}
      {canGoBack && (
        <button 
          className="bg-gray-800/70 backdrop-blur-sm hover:bg-gray-700/90 text-white rounded-full p-2 flex items-center transition-colors duration-200 border border-white/20 shadow-lg"
          onClick={handleBackClick}
          title={text.back}
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {/* Navigation path */}
      <div className="ml-3 bg-gray-800/70 backdrop-blur-sm rounded-full px-4 py-1.5 text-white/90 text-sm border border-white/20">
        <span className="font-medium">
          {currentPath.join(text.separator)}
        </span>
      </div>
    </div>
  );
};

export default NavigationControls; 