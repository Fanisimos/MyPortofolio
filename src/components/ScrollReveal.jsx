import { useEffect, useRef, useState } from 'react';
import './ScrollReveal.css';

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  threshold = 0.1,
  once = true,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '50px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, once]);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (direction) {
        case 'left':
          return 'scroll-reveal-from-left';
        case 'right':
          return 'scroll-reveal-from-right';
        case 'up':
          return 'scroll-reveal-from-bottom';
        case 'down':
          return 'scroll-reveal-from-top';
        case 'fade':
          return 'scroll-reveal-fade';
        case 'scale':
          return 'scroll-reveal-scale';
        default:
          return 'scroll-reveal-from-bottom';
      }
    }
    return 'scroll-reveal-visible';
  };

  return (
    <div
      ref={elementRef}
      className={`scroll-reveal ${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
