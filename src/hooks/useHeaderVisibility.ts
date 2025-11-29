import { useState, useEffect, useRef, useCallback } from 'react';

export const useHeaderVisibility = (hideDelay: number = 3000) => {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  const showHeader = useCallback(() => {
    setIsVisible(true);

    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set new timeout to hide header
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(false);
    }, hideDelay);
  }, [hideDelay]);

  useEffect(() => {
    // Show header on mouse move
    const handleMouseMove = () => showHeader();

    // Show header on touch
    const handleTouch = () => showHeader();

    // Show header on scroll
    const handleScroll = () => showHeader();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleTouch);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleTouch);
      window.removeEventListener('scroll', handleScroll);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hideDelay, showHeader]);

  return isVisible;
};
