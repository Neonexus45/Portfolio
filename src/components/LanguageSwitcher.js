import React from 'react';
import { Globe } from 'lucide-react';

/**
 * Component for switching between languages
 * @param {string} language - Current language
 * @param {function} setLanguage - Function to update language
 */
const LanguageSwitcher = ({ language, setLanguage }) => {
  return (
    <button 
      className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 px-3 rounded-full transition-colors duration-300"
      onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
      aria-label={`Switch to ${language === 'en' ? 'French' : 'English'}`}
    >
      <Globe size={16} />
      <span>{language === 'en' ? 'FR' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;
