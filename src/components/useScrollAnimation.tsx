import React, { useEffect, useRef, useState } from 'react'

interface UseScrollAnimationOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
  delay?: number
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}): { elementRef: React.RefObject<HTMLElement>, isVisible: boolean, hasTriggered: boolean } {
  const {
    threshold = 0.1,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    delay = 0
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries
        
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true)
            setHasTriggered(true)
          }, delay)
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [threshold, rootMargin, triggerOnce, delay, hasTriggered])

  return { elementRef, isVisible, hasTriggered }
}

// Animation variants for different types of content
export const getAnimationClass = (variant: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'slideLeft' | 'slideRight' | 'bounce' | 'rotate' = 'fadeUp', isVisible: boolean) => {
  const baseClasses = 'transition-all duration-700'
  const easingClass = 'scroll-premium-ease'
  
  if (!isVisible) {
    switch (variant) {
      case 'fadeUp':
        return `${baseClasses} ${easingClass} opacity-0 translate-y-8 scale-95`
      case 'fadeLeft':
        return `${baseClasses} ${easingClass} opacity-0 -translate-x-8 scale-95`
      case 'fadeRight':
        return `${baseClasses} ${easingClass} opacity-0 translate-x-8 scale-95`
      case 'scale':
        return `${baseClasses} ${easingClass} opacity-0 scale-90`
      case 'slideLeft':
        return `${baseClasses} ${easingClass} opacity-0 -translate-x-12`
      case 'slideRight':
        return `${baseClasses} ${easingClass} opacity-0 translate-x-12`
      case 'bounce':
        return `${baseClasses} ${easingClass} opacity-0 translate-y-12 scale-90`
      case 'rotate':
        return `${baseClasses} ${easingClass} opacity-0 rotate-3 scale-95`
      default:
        return `${baseClasses} ${easingClass} opacity-0 translate-y-8 scale-95`
    }
  }
  
  return `${baseClasses} ${easingClass} opacity-100 translate-x-0 translate-y-0 scale-100 rotate-0`
}

// Staggered animation for lists/grids
export function useStaggeredAnimation(itemCount: number, staggerDelay: number = 100): { elementRef: React.RefObject<HTMLElement>, isVisible: boolean, getStaggeredClass: (index: number, variant?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale') => { className: string, style: React.CSSProperties } } {
  const { elementRef, isVisible } = useScrollAnimation()
  
  const getStaggeredClass = (index: number, variant: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' = 'fadeUp') => {
    const delay = isVisible ? `${index * staggerDelay}ms` : '0ms'
    const style = { transitionDelay: delay }
    
    return {
      className: getAnimationClass(variant, isVisible),
      style
    }
  }
  
  return { elementRef, isVisible, getStaggeredClass }
}