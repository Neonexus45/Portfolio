import React from 'react';
import { Linkedin, Github } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import content from '../data/content';

/**
 * Navigation component for the portfolio
 * @param {string} activeSection - Currently active section
 * @param {function} scrollToSection - Function to scroll to a section
 * @param {string} language - Current language
 * @param {function} setLanguage - Function to update language
 * @param {Array} sections - List of available sections
 */
const Navigation = ({ activeSection, scrollToSection, language, setLanguage, sections }) => {
  const text = content[language];
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          Ethan <span className="text-purple-500">Tomaso</span>
        </div>
        
        {/* Navigation links */}
        <div className="hidden md:flex space-x-6">
          {sections.map((section) => (
            <button
              key={section}
              className={`capitalize ${
                activeSection === section 
                  ? 'text-purple-400 font-medium' 
                  : 'text-gray-400 hover:text-purple-300'
              }`}
              onClick={() => scrollToSection(section)}
            >
              {text.nav[section]}
            </button>
          ))}
        </div>
        
        {/* Language switcher and social links */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher language={language} setLanguage={setLanguage} />
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
            <Linkedin />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-purple-400">
            <Github />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
