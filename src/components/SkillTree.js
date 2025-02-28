import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import skillTree from '../data/skills';

/**
 * Interactive expandable skill tree component
 */
const SkillTree = () => {
  // State to track which nodes are expanded
  const [expandedNodes, setExpandedNodes] = useState({});
  
  // Toggle expansion of a node
  const toggleNode = (nodePath) => {
    setExpandedNodes(prev => {
      const newState = {...prev};
      newState[nodePath] = !prev[nodePath];
      return newState;
    });
  };
  
  // Recursive function to render nodes
  const renderNode = (node, path = "", level = 0) => {
    const currentPath = path ? `${path}.${node.name}` : node.name;
    const isExpanded = expandedNodes[currentPath];
    const hasChildren = node.children && node.children.length > 0;
    
    // Determine node color based on level
    const getNodeColor = (level) => {
      if (level === 0) return "bg-purple-600 hover:bg-purple-500";
      if (level === 1) return "bg-blue-600 hover:bg-blue-500";
      if (level === 2) return "bg-cyan-600 hover:bg-cyan-500";
      return "bg-teal-600 hover:bg-teal-500";
    };
    
    // Skill level indicators
    const renderSkillLevel = (level) => {
      return (
        <div className="flex mt-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 h-4 mx-0.5 ${i < node.level ? 'bg-green-400' : 'bg-gray-600'}`}
            />
          ))}
        </div>
      );
    };
    
    return (
      <div
        key={currentPath}
        className={`relative ${level > 0 ? 'ml-6' : ''} mb-2`}
      >
        <div className="relative">
          {/* Connection line to parent */}
          {level > 0 && (
            <div className="absolute h-full w-0.5 bg-gray-700 left-0 top-0 transform -translate-x-6"></div>
          )}
          
          {/* Node */}
          <div 
            className={`flex items-center cursor-pointer rounded-lg shadow-md p-3 ${getNodeColor(level)} text-white transition-all duration-300 transform ${isExpanded ? 'scale-105' : ''}`}
            onClick={() => toggleNode(currentPath)}
          >
            {hasChildren && (
              <div className="mr-2">
                {isExpanded ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronRight size={16} />
                )}
              </div>
            )}
            
            <div className="flex-grow font-medium">{node.name}</div>
            
            {node.level && renderSkillLevel(node.level)}
          </div>
        </div>
        
        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="mt-2 pl-2 border-l border-gray-700">
            {node.children.map(child => renderNode(child, currentPath, level + 1))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="py-6">
      {renderNode(skillTree)}
      <div className="text-gray-400 text-center mt-4 text-sm">
        Click on skill categories to expand
      </div>
    </div>
  );
};

export default SkillTree;
