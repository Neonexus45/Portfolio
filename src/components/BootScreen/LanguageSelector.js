import React from 'react';
import { Globe, ChevronDown } from 'lucide-react';

const LanguageSelector = ({ onLanguageSelect }) => {
  return (
    <div className="mt-4 animate-fade-in">
      <div className="grid grid-cols-2 gap-6 my-4">
        <button
          onClick={() => onLanguageSelect('en')}
          className="flex items-center justify-between border border-blue-500 hover:bg-blue-500/20 rounded-md p-4 transition-all duration-300"
        >
          <div className="flex items-center">
            <Globe className="mr-3 text-blue-400" />
            <div className="text-left">
              <div className="font-bold text-white">English</div>
              <div className="text-gray-400 text-xs">Set interface language to English</div>
            </div>
          </div>
          <ChevronDown className="text-blue-400" />
        </button>
        
        <button
          onClick={() => onLanguageSelect('fr')}
          className="flex items-center justify-between border border-purple-500 hover:bg-purple-500/20 rounded-md p-4 transition-all duration-300"
        >
          <div className="flex items-center">
            <Globe className="mr-3 text-purple-400" />
            <div className="text-left">
              <div className="font-bold text-white">Français</div>
              <div className="text-gray-400 text-xs">Définir la langue de l'interface en français</div>
            </div>
          </div>
          <ChevronDown className="text-purple-400" />
        </button>
      </div>
      
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default LanguageSelector; 