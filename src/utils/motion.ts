import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Safely register ScrollTrigger in browser environments
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  });
}

// Sophisticated easing curves tailored for luxury, calm editorial motion
export const EASINGS = {
  cinematic: 'power4.out',
  editorial: 'power3.out',
  smooth: 'power2.out',
  expo: 'expo.out',
  natural: 'cubic-bezier(0.16, 1, 0.3, 1)',
  softInOut: 'power2.inOut',
};

// Check if user prefers reduced motion
export const isReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Check if screen is mobile
export const isMobileScreen = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
};

// Lenis smooth scroll singleton
let lenisInstance: Lenis | null = null;

export const getLenis = (): Lenis | null => lenisInstance;

export const initSmoothScroll = (): Lenis | null => {
  if (typeof window === 'undefined') return null;
  if (isReducedMotion()) return null;
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    duration: 1.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    touchMultiplier: 1.25,
  });

  // Synchronize Lenis scroll position with GSAP ScrollTrigger
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Connect GSAP ticker to Lenis requestAnimationFrame
  const tickerCallback = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };
  gsap.ticker.add(tickerCallback);
  gsap.ticker.lagSmoothing(500, 33);

  return lenisInstance;
};

export const scrollToTop = (immediate: boolean = true) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate });
  } else if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' });
  }
};

export const refreshScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }
};

/**
 * Animate a counter value smoothly with GSAP ScrollTrigger
 * e.g., "5,600+", "5,000+", "15", "4", "₹1,999"
 */
export const initCountUp = (
  element: HTMLElement,
  finalValue: number,
  options?: {
    duration?: number;
    prefix?: string;
    suffix?: string;
    trigger?: Element | string;
    start?: string;
  }
) => {
  if (isReducedMotion()) {
    element.textContent = `${options?.prefix || ''}${finalValue.toLocaleString()}${options?.suffix || ''}`;
    return null;
  }

  const obj = { val: 0 };
  const duration = options?.duration || (isMobileScreen() ? 1.2 : 1.6);
  const prefix = options?.prefix || '';
  const suffix = options?.suffix || '';

  return gsap.to(obj, {
    val: finalValue,
    duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: options?.trigger || element,
      start: options?.start || 'top 88%',
      once: true,
    },
    onUpdate: () => {
      const rounded = Math.round(obj.val);
      element.textContent = `${prefix}${rounded.toLocaleString()}${suffix}`;
    },
  });
};

/**
 * Curtained clip-path image reveal with subtle de-scaling
 * Delivers an editorial unveiling feel rather than a flat fade
 */
export const initImageCurtainReveal = (
  container: HTMLElement,
  imageEl?: HTMLElement | null,
  options?: {
    trigger?: Element | string;
    start?: string;
    duration?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
  }
) => {
  if (isReducedMotion()) {
    gsap.set(container, { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 });
    if (imageEl) gsap.set(imageEl, { scale: 1, opacity: 1 });
    return null;
  }

  const duration = options?.duration || 1.1;
  const startPos = options?.start || 'top 82%';

  // Initial state
  gsap.set(container, {
    clipPath: 'inset(12% 0% 0% 0%)',
    opacity: 0,
  });

  if (imageEl) {
    gsap.set(imageEl, {
      scale: 1.08,
    });
  }

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: options?.trigger || container,
      start: startPos,
      once: true,
    },
    delay: options?.delay || 0,
  });

  tl.to(container, {
    clipPath: 'inset(0% 0% 0% 0%)',
    opacity: 1,
    duration,
    ease: EASINGS.editorial,
  });

  if (imageEl) {
    tl.to(
      imageEl,
      {
        scale: 1,
        duration: duration * 1.15,
        ease: EASINGS.cinematic,
      },
      0
    );
  }

  return tl;
};

/**
 * Subconscious subtle image parallax relative to surrounding section
 */
export const initSubtleParallax = (
  imageEl: HTMLElement,
  options?: {
    trigger?: Element | string;
    speed?: number; // default ~20px
    start?: string;
    end?: string;
  }
) => {
  if (isReducedMotion() || isMobileScreen()) return null;

  const distance = options?.speed || 24;

  return gsap.fromTo(
    imageEl,
    { y: -distance / 2 },
    {
      y: distance / 2,
      ease: 'none',
      scrollTrigger: {
        trigger: options?.trigger || imageEl,
        start: options?.start || 'top bottom',
        end: options?.end || 'bottom top',
        scrub: 1.2,
      },
    }
  );
};

/**
 * Stagger reveal for card grids, dossiers, trust marks
 */
export const initCardGridStagger = (
  cards: HTMLElement[] | NodeListOf<Element>,
  options?: {
    trigger?: Element | string;
    start?: string;
    stagger?: number;
    yDistance?: number;
    duration?: number;
  }
) => {
  if (!cards || cards.length === 0) return null;

  if (isReducedMotion()) {
    gsap.set(cards, { opacity: 1, y: 0 });
    return null;
  }

  const yDistance = options?.yDistance || (isMobileScreen() ? 20 : 32);
  const staggerTime = options?.stagger || (isMobileScreen() ? 0.06 : 0.09);
  const duration = options?.duration || 0.85;

  gsap.set(cards, {
    opacity: 0,
    y: yDistance,
  });

  return gsap.to(cards, {
    opacity: 1,
    y: 0,
    duration,
    stagger: staggerTime,
    ease: EASINGS.editorial,
    scrollTrigger: {
      trigger: options?.trigger || (Array.isArray(cards) ? cards[0] : cards[0]),
      start: options?.start || 'top 82%',
      once: true,
    },
  });
};

/**
 * Editorial section header entrance (eyebrow -> heading -> paragraph)
 */
export const initSectionHeaderReveal = (
  container: HTMLElement,
  options?: {
    start?: string;
  }
) => {
  if (isReducedMotion()) {
    gsap.set(container.children, { opacity: 1, y: 0 });
    return null;
  }

  const children = Array.from(container.children);
  gsap.set(children, {
    opacity: 0,
    y: isMobileScreen() ? 18 : 28,
  });

  return gsap.to(children, {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: EASINGS.editorial,
    scrollTrigger: {
      trigger: container,
      start: options?.start || 'top 85%',
      once: true,
    },
  });
};

export { gsap, ScrollTrigger };
