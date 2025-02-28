import { useState, useEffect } from 'react';

/**
 * Custom hook for detecting when an element is visible in the viewport
 * @param {React.RefObject} ref - Reference to the DOM element to observe
 * @param {string} rootMargin - Margin around the root element
 * @returns {boolean} - Whether the element is visible on screen
 */
const useOnScreen = (ref, rootMargin = "0px") => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Create IntersectionObserver to watch when element enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    // Cleanup observer on component unmount
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);

  return isVisible;
};

export default useOnScreen;
