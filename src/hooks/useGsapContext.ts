import { useLayoutEffect, useEffect, useRef, type DependencyList } from 'react';
import { gsap, ScrollTrigger } from '../utils/motion';

// Use isomorphic layout effect for SSR safety
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * useGsapContext:
 * Scopes all GSAP animations, timelines, and ScrollTriggers to a specific React ref container.
 * Calls ctx.revert() on unmount to prevent duplicate triggers or memory leaks.
 */
export function useGsapContext(
  animationCallback: (ctx: gsap.Context, container: HTMLElement) => void,
  dependencies: DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useIsomorphicLayoutEffect(() => {
    if (!containerRef.current) return;

    // Initialize synchronously in layout effect to set initial states prior to paint (prevents FOUC)
    const ctx = gsap.context((self) => {
      if (containerRef.current) {
        animationCallback(self, containerRef.current);
      }
    }, containerRef);

    // Refresh ScrollTrigger after paint to ensure accurate layout metrics
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, dependencies);

  return containerRef;
}
