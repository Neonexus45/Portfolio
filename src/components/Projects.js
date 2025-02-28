import React, { useRef } from 'react';
import { Code, ExternalLink } from 'lucide-react';
import useOnScreen from '../hooks/useOnScreen';
import projects from '../data/projects';

/**
 * Projects section component with expandable project cards
 * @param {string} language - Current language
 */
const Projects = ({ language }) => {
  const projectsRef = useRef(null);
  const isVisible = useOnScreen(projectsRef, "-50px");
  const currentProjects = projects[language];

  const handleProjectClick = (repoUrl) => {
    if (repoUrl) {
      window.open(repoUrl, '_blank');
    }
  };

  return (
    <div 
      ref={projectsRef}
      className="grid md:grid-cols-2 gap-8"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease'
      }}
    >
      {currentProjects.map((project, index) => (
        <div 
          key={index}
          onClick={() => handleProjectClick(project.repoUrl)}
          className={`bg-gray-900 rounded-lg p-6 shadow-lg border-t-4 border-purple-600 ${
            project.repoUrl ? 'cursor-pointer hover:shadow-xl hover:scale-105' : ''
          } transition-all duration-300`}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-xl text-purple-400">{project.title}</h3>
            {project.repoUrl && (
              <ExternalLink size={20} className="text-purple-400" />
            )}
          </div>
          
          <p className="text-gray-300 mb-4">{project.description}</p>
          
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 bg-gray-800 text-purple-300 rounded-full text-sm flex items-center"
                >
                  <Code size={14} className="mr-1" />
                  {tech}
                </span>
              ))}
            </div>
            
            <ul className="list-disc list-inside text-gray-400 text-sm space-y-1">
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
