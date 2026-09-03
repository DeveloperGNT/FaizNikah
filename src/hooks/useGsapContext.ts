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

    let ctx: gsap.Context | null = null;
    let rafId: number | null = null;

    // requestAnimationFrame ensures DOM layout dimensions and fonts are painted
    // preventing ScrollTrigger from calculating stuck or offset positions
    rafId = requestAnimationFrame(() => {
      if (!containerRef.current) return;
      ctx = gsap.context((self) => {
        if (containerRef.current) {
          animationCallback(self, containerRef.current);
        }
      }, containerRef);
      ScrollTrigger.refresh();
    });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      if (ctx) ctx.revert();
    };
  }, dependencies);

  return containerRef;
}
