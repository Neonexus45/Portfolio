import React, { useRef } from 'react';
import { Briefcase, Calendar } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import experience from '../data/experience';

/**
 * Experience timeline component with animation
 * @param {string} language - Current language
 */
const ExperienceTimeline = ({ language }) => {
  const timelineRef = useRef(null);
  const isVisible = useOnScreen(timelineRef, "-100px");
  const currentExperiences = experience[language];

  return (
    <div ref={timelineRef} className="relative py-12">
      {/* Center line of timeline */}
      <div className="absolute left-1/2 h-full w-0.5 bg-purple-800 transform -translate-x-1/2"></div>
      
      {/* Experience items */}
      {currentExperiences.map((exp, index) => (
        <div
          key={index}
          className={`relative ${index % 2 === 0 ? 'left-0 pr-12 text-right' : 'left-1/2 pl-12'} mb-12 w-1/2`}
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible 
              ? 'translateY(0)' 
              : `translateY(${index % 2 === 0 ? '20px' : '-20px'})`,
            transition: `all 0.5s ease ${index * 0.2}s`
          }}
        >
          {/* Timeline dot */}
          <div className="absolute top-2 w-4 h-4 rounded-full bg-purple-600 shadow-lg z-10"
            style={{ 
              [index % 2 === 0 ? 'right' : 'left']: '-2px',
              transform: 'translateX(-50%)'
            }}
          ></div>
          
          {/* Experience card */}
          <div className="bg-gray-900 rounded-lg shadow-md p-6 border-l-4 border-purple-600">
            <h3 className="font-bold text-lg text-purple-400">{exp.title}</h3>
            <div className="flex items-center gap-1 text-gray-400 mb-2">
              <Briefcase size={14} />
              <span>{exp.company}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-400 mb-2">
              <Calendar size={14} />
              <span>{exp.period}</span>
            </div>
            <p className="text-gray-300 mb-2">{exp.description}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.skills.map((skill, i) => (
                <span key={i} className="bg-gray-800 text-cyan-400 text-xs px-2 py-1 rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceTimeline;
