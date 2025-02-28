import React from 'react';

/**
 * Expandable project card component
 * 
 * @param {Object} project - Project data
 * @param {boolean} isExpanded - Whether the card is expanded
 * @param {function} toggleExpand - Function to toggle expanded state
 */
const ProjectCard = ({ project, isExpanded, toggleExpand }) => {
  return (
    <div 
      className={`bg-gray-900 rounded-lg overflow-hidden transition-all duration-500 shadow-lg ${
        isExpanded ? 'scale-105 shadow-xl' : 'hover:shadow-md'
      }`}
    >
      {/* Card header with gradient background */}
      <div 
        className="h-48 bg-gradient-to-r from-purple-800 to-blue-800 flex items-center justify-center cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="text-white text-xl font-bold">{project.title}</div>
      </div>
      
      {/* Card content with expandable area */}
      <div 
        className="overflow-hidden transition-all duration-500"
        style={{ 
          maxHeight: isExpanded ? '500px' : '100px',
        }}
      >
        <div className="p-6">
          <h3 className="font-bold text-lg text-purple-400 mb-2">{project.title}</h3>
          <p className="text-gray-300 mb-4">{project.description}</p>
          
          {/* Additional content shown when expanded */}
          {isExpanded && (
            <>
              <div className="mb-4">
                <h4 className="font-semibold text-blue-400 mb-1">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-800 text-cyan-400 text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-blue-400 mb-1">Key Features</h4>
                <ul className="list-disc list-inside text-gray-300">
                  {project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
