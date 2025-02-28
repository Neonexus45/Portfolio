// Utility functions
export const random = (min, max) => Math.random() * (max - min) + min;

// Get planet size based on depth and importance
export const getPlanetSize = (depth, hasChildren, isMain = false) => {
  if (isMain) return 70; // Main "Skills" planet
  if (depth === 1) return 50; // Main categories
  if (depth === 2) return 40; // Subcategories
  if (hasChildren) return 35; // Branch nodes
  return 25; // Leaf skills
}; 