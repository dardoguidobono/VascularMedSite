import { useState, useEffect, useRef, RefObject } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook to observe when an element enters the viewport
 */
export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0px',
  triggerOnce = false,
}: UseIntersectionObserverProps = {}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<Element | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  
  useEffect(() => {
    if (!window.IntersectionObserver) {
      // Fallback for browsers that don't support IntersectionObserver
      setInView(true);
      return;
    }
    
    // Cleanup previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setInView(entry.isIntersecting);
        
        // If triggerOnce is true and element is in view, disconnect the observer
        if (triggerOnce && entry.isIntersecting && observerRef.current) {
          observerRef.current.disconnect();
        }
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );
    
    observerRef.current = observer;
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, root, rootMargin, triggerOnce]);
  
  return { ref, inView, setRef: (node: Element | null) => { ref.current = node; } };
}
