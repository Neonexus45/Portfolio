import React, { useState, useRef, useEffect } from 'react';
import { skillTree, getCategoryColor } from '../../data/skills';
import { getPlanetSize } from './utils';

// Components
import Planet from './Planet';
import Star from './Star';
import OrbitLine from './OrbitLine';
import ConnectionLine from './ConnectionLine';

const SkillUniverseVisualization = ({
  dimensions,
  centerX,
  centerY,
  activeCategory,
  activeCategoryNode,
  activeSubcategory,
  activeSubcategoryNode,
  activeSkill,
  hoveredEntity,
  setHoveredEntity,
  handleNavigation,
  positionCache,
  cachePosition,
  language = 'en'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const orbitRef = useRef(null);

  // Gestionnaire de début de drag
  const handleMouseDown = (e) => {
    if (e.button === 0) { // Clic gauche uniquement
      setIsDragging(true);
      setDragStart({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      });
    }
  };

  // Gestionnaire de déplacement
  const handleMouseMove = (e) => {
    if (isDragging) {
      const newOffset = {
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      };
      setOffset(newOffset);

      // Mettre à jour directement la position de l'orbite pour une meilleure performance
      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate3d(${newOffset.x}px, ${newOffset.y}px, 0)`;
      }
    }
  };

  // Gestionnaire de fin de drag
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Ajout/Suppression des event listeners
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Main sizing and spacing parameters
  const mainRadius = getPlanetSize(0, true, true);
  const orbitRadius = Math.min(dimensions.width, dimensions.height) * (dimensions.width < 640 ? 0.3 : 0.35);
  const categorySpacing = Math.PI * (dimensions.width < 640 ? 0.5 : 0.3);

  // Ajuster les coordonnées en fonction du déplacement
  const adjustCoords = (x, y) => ({
    x: x + offset.x,
    y: y + offset.y
  });

  // Render main categories
  const mainCategories = skillTree[language].children;
  const mainCategoryPlanets = mainCategories.map((category, index) => {
    const angle = (index / mainCategories.length) * 2 * Math.PI;
    const baseX = centerX + orbitRadius * Math.cos(angle);
    const baseY = centerY + orbitRadius * Math.sin(angle);
    const { x, y } = adjustCoords(baseX, baseY);
    const radius = getPlanetSize(1, category.children && category.children.length > 0);
    
    cachePosition(category.name, { x: baseX, y: baseY });
    
    const isActive = activeCategory === category.name;
    const isHovered = hoveredEntity === category.name;
    const categoryColor = getCategoryColor(category.name, language);
    
    return (
      <React.Fragment key={`cat-fragment-${category.name}`}>
        <ConnectionLine 
          key={`conn-center-${category.name}`} 
          x1={centerX + offset.x} 
          y1={centerY + offset.y} 
          x2={x} 
          y2={y} 
          color={categoryColor.primary} 
          pulse={isActive || isHovered}
        />
        <Planet 
          key={`cat-${category.name}`}
          name={category.name}
          icon={category.icon}
          x={x}
          y={y}
          radius={radius}
          isActive={isActive}
          isHovered={isHovered}
          hasChildren={category.children && category.children.length > 0}
          depth={1}
          onHover={setHoveredEntity}
          onClick={(e) => {
            e.stopPropagation();
            handleNavigation('category', category.name);
          }}
        />
      </React.Fragment>
    );
  });
  
  // Render subcategories and skills
  let subCategoryPlanets = [];
  if (activeCategory && activeCategoryNode && activeCategoryNode.children) {
    const subcategories = activeCategoryNode.children;
    
    if (subcategories.length > 0) {
      const subOrbitRadius = Math.min(dimensions.width, dimensions.height) * 0.25;
      const categoryIndex = skillTree[language].children.findIndex(c => c.name === activeCategory);
      const categoryAngle = (categoryIndex / skillTree[language].children.length) * 2 * Math.PI;
      const baseCategoryX = centerX + orbitRadius * Math.cos(categoryAngle);
      const baseCategoryY = centerY + orbitRadius * Math.sin(categoryAngle);
      const { x: categoryX, y: categoryY } = adjustCoords(baseCategoryX, baseCategoryY);
      
      subcategories.forEach((subcategory, subIndex) => {
        const subAngle = categoryAngle + (subIndex - (subcategories.length - 1) / 2) * categorySpacing;
        const baseSubX = baseCategoryX + subOrbitRadius * Math.cos(subAngle);
        const baseSubY = baseCategoryY + subOrbitRadius * Math.sin(subAngle);
        const { x: subX, y: subY } = adjustCoords(baseSubX, baseSubY);
        const subRadius = getPlanetSize(2, subcategory.children && subcategory.children.length > 0);
        
        cachePosition(subcategory.name, { x: baseSubX, y: baseSubY });
        
        const isSubActive = activeSubcategory === subcategory.name;
        const isSubHovered = hoveredEntity === subcategory.name;
        const subColor = getCategoryColor(subcategory.name, language);
        
        subCategoryPlanets.push(
          <ConnectionLine 
            key={`conn-${activeCategory}-${subcategory.name}`} 
            x1={categoryX} 
            y1={categoryY} 
            x2={subX} 
            y2={subY} 
            color={subColor.primary} 
            pulse={isSubActive || isSubHovered}
          />
        );
        
        subCategoryPlanets.push(
          <Planet 
            key={`subcat-${subcategory.name}`}
            name={subcategory.name}
            icon={subcategory.icon}
            x={subX}
            y={subY}
            radius={subRadius}
            isActive={isSubActive}
            isHovered={isSubHovered}
            hasChildren={subcategory.children && subcategory.children.length > 0}
            depth={2}
            onHover={setHoveredEntity}
            onClick={(e) => {
              e.stopPropagation();
              handleNavigation('subcategory', subcategory.name);
            }}
          />
        );

        // Afficher les compétences si la sous-catégorie est active
        if (isSubActive && subcategory.children) {
          const skills = subcategory.children;
          const skillRadius = Math.min(dimensions.width, dimensions.height) * 0.35;
          
          const startAngle = Math.atan2(baseSubY - centerY, baseSubX - centerX);
          const angleSpread = Math.PI * 0.5;
          
          skills.forEach((skill, skillIndex) => {
            const progress = skills.length === 1 ? 0.5 : skillIndex / (skills.length - 1);
            const skillAngle = startAngle - (angleSpread / 2) + (angleSpread * progress);
            
            const baseSkillX = baseSubX + skillRadius * Math.cos(skillAngle);
            const baseSkillY = baseSubY + skillRadius * Math.sin(skillAngle);
            const { x: skillX, y: skillY } = adjustCoords(baseSkillX, baseSkillY);
            
            cachePosition(skill.name, { x: baseSkillX, y: baseSkillY });
            
            const isSkillActive = activeSkill === skill.name;
            const isSkillHovered = hoveredEntity === skill.name;
            
            subCategoryPlanets.push(
              <React.Fragment key={`skill-fragment-${skill.name}`}>
                <ConnectionLine 
                  key={`conn-${subcategory.name}-${skill.name}`} 
                  x1={subX} 
                  y1={subY} 
                  x2={skillX} 
                  y2={skillY} 
                  color={subColor.primary} 
                  pulse={isSkillActive || isSkillHovered}
                />
                <Star 
                  key={`skill-${skill.name}`}
                  name={skill.name}
                  level={skill.level}
                  x={skillX}
                  y={skillY}
                  color={subColor}
                  isActive={isSkillActive}
                  isHovered={isSkillHovered}
                  onHover={setHoveredEntity}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation('skill', skill.name);
                  }}
                />
              </React.Fragment>
            );
          });
        }
      });
    }
  }
  
  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
      onMouseDown={handleMouseDown}
    >
      <div 
        ref={orbitRef} 
        className="absolute top-0 left-0 w-full h-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          willChange: 'transform'
        }}
      >
        <OrbitLine 
          centerX={centerX} 
          centerY={centerY} 
          radius={orbitRadius} 
          isActive={!activeCategory} 
        />
        
        {/* Center node */}
        <Planet 
          name={language === 'fr' ? "Univers des Compétences" : "Skills Universe"}
          icon={Star}
          x={centerX}
          y={centerY}
          radius={mainRadius}
          isActive={!activeCategory}
          isHovered={hoveredEntity === "Skills"}
          hasChildren={true}
          depth={0}
          onHover={setHoveredEntity}
          onClick={() => handleNavigation(null, null)}
        />
      </div>
      
      {mainCategoryPlanets}
      {subCategoryPlanets}
    </div>
  );
};

export default SkillUniverseVisualization; 