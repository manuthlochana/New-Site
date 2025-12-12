import { useState, useEffect, useCallback, RefObject } from 'react';

interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  disabled?: boolean;
}

export const useParallax = (
  ref: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) => {
  const { speed = 0.5, direction = 'up', disabled = false } = options;
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    if (disabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Calculate parallax offset
    const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? 1 : -1);
    setOffset(parallaxOffset);
  }, [ref, speed, direction, disabled]);

  useEffect(() => {
    if (disabled) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, disabled]);

  return { offset };
};

// Parallax wrapper component for easy use
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  disabled?: boolean;
}

export const Parallax = ({ 
  children, 
  speed = 0.3, 
  direction = 'up', 
  className = '',
  disabled = false 
}: ParallaxProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (disabled || !ref) return;

    const handleScroll = () => {
      const rect = ref.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      
      const parallaxOffset = distanceFromCenter * speed * (direction === 'up' ? 1 : -1);
      setOffset(parallaxOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref, speed, direction, disabled]);

  // Disable parallax on mobile for performance
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div
      ref={setRef}
      className={className}
      style={{
        transform: isMobile || disabled ? 'none' : `translateY(${offset}px)`,
        willChange: 'transform',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;
