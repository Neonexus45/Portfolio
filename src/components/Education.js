import React, { useState, useRef } from 'react';
import { Book, Calendar, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import education from '../data/education';

/**
 * Education component with animated cards
 * @param {string} language - Current language
 */
const Education = ({ language }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const educationRef = useRef(null);
  const isVisible = useOnScreen(educationRef, "-50px");
  const currentEducation = education[language];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === currentEducation.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? currentEducation.length - 1 : prevIndex - 1
    );
  };

  return (
    <div 
      ref={educationRef}
      className="relative max-w-6xl mx-auto"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease'
      }}
    >
      {/* Navigation Buttons */}
      <button 
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700 transition-colors z-10"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-purple-600 p-2 rounded-full text-white hover:bg-purple-700 transition-colors z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Timeline */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center gap-4">
          {currentEducation.map((_, index) => (
            <React.Fragment key={index}>
              <div 
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-purple-600 scale-125' : 'bg-gray-600'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
              {index < currentEducation.length - 1 && (
                <div className="flex items-center text-purple-400">
                  <ArrowRight size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Education Cards */}
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {currentEducation.map((edu, index) => (
            <div 
              key={index}
              className="w-full flex-shrink-0 px-4"
            >
              <div className="bg-gray-900 rounded-lg shadow-lg p-6 border-t-4 border-purple-600">
                <h3 className="font-bold text-xl text-purple-400 mb-3">{edu.school}</h3>
                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Book size={18} />
                  <span className="font-medium">{edu.degree}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Calendar size={18} />
                  <span>{edu.period}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Education;
