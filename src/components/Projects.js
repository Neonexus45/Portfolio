import React, { useState, useRef } from 'react';
import ProjectCard from './ProjectCard';
import useOnScreen from '../hooks/useOnScreen';
import projects from '../data/projects';

/**
 * Projects section component with expandable project cards
 * @param {string} language - Current language
 */
const Projects = ({ language }) => {
  // Track which project is expanded (null if none)
  const [expandedProject, setExpandedProject] = useState(null);
  
  const projectsRef = useRef(null);
  const isVisible = useOnScreen(projectsRef, "-50px");
  const currentProjects = projects[language];
  
  return (
    <div 
      ref={projectsRef} 
      className="grid md:grid-cols-3 gap-6 py-12"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'all 0.8s ease'
      }}
    >
      {currentProjects.map((project, index) => (
        <ProjectCard 
          key={index}
          project={project}
          isExpanded={expandedProject === index}
          toggleExpand={() => setExpandedProject(expandedProject === index ? null : index)}
        />
      ))}
    </div>
  );
};

export default Projects;
