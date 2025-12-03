import { useState, useEffect, useRef } from 'react';

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const intersectingRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50px 0px -50px 0px', // Better detection of current section
      threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better accuracy
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          intersectingRefs.current.set(entry.target.id, entry);
        } else {
          intersectingRefs.current.delete(entry.target.id);
        }
      });

      // Find the most visible section (highest intersection ratio)
      // or the topmost section if multiple have same ratio
      let maxRatio = 0;
      let topMostSection = '';
      let minTop = Infinity;

      intersectingRefs.current.forEach((entry, id) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          topMostSection = id;
          minTop = entry.boundingClientRect.top;
        } else if (entry.intersectionRatio === maxRatio) {
          // If same ratio, pick the one that appears first on screen
          if (entry.boundingClientRect.top < minTop) {
            topMostSection = id;
            minTop = entry.boundingClientRect.top;
          }
        }
      });

      if (topMostSection && topMostSection !== activeSection) {
        setActiveSection(topMostSection);
      }
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
      intersectingRefs.current.clear();
    };
  }, [sectionIds, activeSection]);

  return activeSection;
};
