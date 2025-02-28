import React from 'react';

const DebugPanel = ({ enabled, state }) => {
  if (!enabled) return null;
  
  return (
    <div className="absolute top-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded border border-gray-700 font-mono">
      <div>activeCategory: {state.activeCategory || "null"}</div>
      <div>activeSubcategory: {state.activeSubcategory || "null"}</div>
      <div>activeSkill: {state.activeSkill || "null"}</div>
      <div>hoveredEntity: {state.hoveredEntity || "null"}</div>
      <div>level: {state.level}</div>
    </div>
  );
};

export default DebugPanel; 