import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { skillTree } from '../../data/skills';
import { getPlanetSize } from './utils';
import SkillUniverseVisualization from './SkillUniverseVisualization';
// Components
import AnimatedBackground from './AnimatedBackground';
import Planet from './Planet';
import Star from './Star';
import OrbitLine from './OrbitLine';
import ConnectionLine from './ConnectionLine';
import NavigationControls from './NavigationControls';
import InfoPanel from './InfoPanel';
import DebugPanel from './DebugPanel';

// Debounce utility
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

const SkillUniverse = ({ language = 'en' }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  // Navigation state
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);
  const [hoveredEntity, setHoveredEntity] = useState(null);
  
  // Fixed position state to prevent flickering during transitions
  const [positionCache, setPositionCache] = useState({});
  const [showDebug] = useState(false);
  
  // Handle navigation
  const handleNavigation = useCallback((type, name) => {
    switch(type) {
      case 'category':
        if (name === activeCategory) {
          setActiveCategory(null);
          setActiveSubcategory(null);
          setActiveSkill(null);
        } else {
          setActiveCategory(name);
        }
        break;
      case 'subcategory':
        if (name === activeSubcategory) {
          setActiveSubcategory(null);
          setActiveSkill(null);
        } else {
          setActiveSubcategory(name);
        }
        break;
      case 'skill':
        setActiveSkill(name === activeSkill ? null : name);
        break;
      default:
        setActiveCategory(null);
        setActiveSubcategory(null);
        setActiveSkill(null);
        break;
    }
  }, [activeCategory, activeSubcategory, activeSkill]);
  
  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        if (activeSkill) {
          handleNavigation('skill', activeSkill);
        } else if (activeSubcategory) {
          handleNavigation('subcategory', activeSubcategory);
        } else if (activeCategory) {
          handleNavigation('category', activeCategory);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeCategory, activeSubcategory, activeSkill, handleNavigation]);
  
  // Update container dimensions on resize with debounce
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };
    
    const debouncedUpdateDimensions = debounce(updateDimensions, 100);
    
    updateDimensions();
    window.addEventListener('resize', debouncedUpdateDimensions);
    
    return () => window.removeEventListener('resize', debouncedUpdateDimensions);
  }, []);
  
  // Center of the universe
  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  
  // Memoize the node map for faster lookups
  const nodeMap = useMemo(() => {
    const map = new Map();
    
    for (const category of skillTree[language].children) {
      map.set(category.name, category);
      
      if (category.children) {
        for (const subcategory of category.children) {
          map.set(subcategory.name, subcategory);
          
          if (subcategory.children) {
            for (const skill of subcategory.children) {
              map.set(skill.name, skill);
            }
          }
        }
      }
    }
    
    return map;
  }, [language]);
  
  // Find node data by name using the map
  const findNode = useCallback((name) => {
    return nodeMap.get(name) || null;
  }, [nodeMap]);
  
  // Find active nodes
  const activeCategoryNode = activeCategory ? findNode(activeCategory) : null;
  const activeSubcategoryNode = activeSubcategory ? findNode(activeSubcategory) : null;
  
  // Cache positions for smooth transitions with debounce
  const cachePosition = useCallback(
    debounce((name, position) => {
      setPositionCache(prev => ({
        ...prev,
        [name]: position
      }));
    }, 50),
    []
  );
  
  return (
    <div className="w-full py-12">
      <div 
        ref={containerRef} 
        className="relative w-full h-screen max-h-[700px] bg-[#030712] rounded-xl overflow-hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleNavigation(null, null);
          }
        }}
      >
        <AnimatedBackground />
        
        <NavigationControls
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          activeSkill={activeSkill}
          handleBackClick={() => {
            if (activeSkill) {
              handleNavigation('skill', activeSkill);
            } else if (activeSubcategory) {
              handleNavigation('subcategory', activeSubcategory);
            } else if (activeCategory) {
              handleNavigation('category', activeCategory);
            }
          }}
          canGoBack={!!(activeCategory || activeSubcategory || activeSkill)}
          currentPath={[
            language === 'fr' ? "Univers des Compétences" : "Skills Universe",
            ...(activeCategory ? [activeCategory] : []),
            ...(activeSubcategory ? [activeSubcategory] : []),
            ...(activeSkill ? [activeSkill] : [])
          ]}
          language={language}
        />
        
        <DebugPanel 
          enabled={showDebug}
          state={{
            activeCategory,
            activeSubcategory,
            activeSkill,
            hoveredEntity
          }}
          language={language}
        />
        
        <InfoPanel 
          activeEntity={activeSkill || activeSubcategory || activeCategory || (language === 'fr' ? "Univers des Compétences" : "Skills Universe")}
          currentLevel={activeSkill ? 3 : activeSubcategory ? 2 : activeCategory ? 1 : 0}
          language={language}
        />
        
        {dimensions.width > 0 && (
          <SkillUniverseVisualization
            dimensions={dimensions}
            centerX={centerX}
            centerY={centerY}
            activeCategory={activeCategory}
            activeCategoryNode={activeCategoryNode}
            activeSubcategory={activeSubcategory}
            activeSubcategoryNode={activeSubcategoryNode}
            activeSkill={activeSkill}
            hoveredEntity={hoveredEntity}
            setHoveredEntity={setHoveredEntity}
            handleNavigation={handleNavigation}
            positionCache={positionCache}
            cachePosition={cachePosition}
            language={language}
          />
        )}
      </div>
    </div>
  );
};

export default SkillUniverse; 