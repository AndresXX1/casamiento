"use client"

import { useEffect, useState, type RefObject } from "react"

interface UseInViewOptions {
  threshold?: number | number[]
  margin?: string
}

export function useInView(ref: RefObject<HTMLElement>, options: UseInViewOptions = {}): boolean {
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          // Opcional: desuscribirse después de que el elemento sea visible una vez
          observer.unobserve(entry.target)
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.margin || "0px",
      },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [ref, options])

  return isInView
}
