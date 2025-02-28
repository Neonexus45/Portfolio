import React, { useRef } from 'react';
import { Book, Calendar } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import education from '../data/education';

/**
 * Education component with animated cards
 * @param {string} language - Current language
 */
const Education = ({ language }) => {
  const educationRef = useRef(null);
  const isVisible = useOnScreen(educationRef, "-50px");
  const currentEducation = education[language];

  return (
    <div 
      ref={educationRef} 
      className="grid md:grid-cols-2 gap-6 py-12"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease'
      }}
    >
      {currentEducation.map((edu, index) => (
        <div 
          key={index} 
          className="bg-gray-900 rounded-lg shadow-lg p-6 border-t-4 border-purple-600 hover:shadow-xl transition-shadow"
        >
          <h3 className="font-bold text-lg text-purple-400">{edu.school}</h3>
          <div className="flex items-center gap-1 text-gray-400 mb-2">
            <Book size={16} />
            <span>{edu.degree}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-400 mb-2">
            <Calendar size={16} />
            <span>{edu.period}</span>
          </div>
          <p className="text-gray-300">{edu.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Education;
