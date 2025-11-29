import { useEffect, useRef } from 'react';

/**
 * Custom hook to preload images as they approach the viewport
 * Uses Intersection Observer API for efficient viewport detection
 */
export const useIntersectionPreload = (threshold = 0.5) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;

            if (src && !img.src) {
              // Preload the image
              img.src = src;
              img.removeAttribute('data-src');
            }
          }
        });
      },
      {
        root: null,
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold,
      }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold]);

  return observerRef;
};

