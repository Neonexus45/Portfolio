import React from 'react';
import content from '../../data/content';

const InfoPanel = ({ activeEntity, currentLevel, language = 'en' }) => {
  if (!activeEntity) return null;
  
  const text = content[language].skillUniverse.info;
  
  const getDescription = () => {
    if (currentLevel === 0) {
      return text.overview;
    } else if (currentLevel === 1) {
      return `${activeEntity} ${text.category}`;
    } else if (currentLevel === 2) {
      return `${activeEntity} ${text.subcategory}`;
    } else {
      return text.skill;
    }
  };
  
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 text-center w-full max-w-lg px-4">
      <div className="bg-gray-900/80 backdrop-blur-md text-white/90 rounded-xl p-4 shadow-lg border border-white/10">
        <h3 className="text-xl font-bold mb-2">{activeEntity}</h3>
        <p className="text-sm text-gray-300">{getDescription()}</p>
      </div>
    </div>
  );
};

export default InfoPanel; 