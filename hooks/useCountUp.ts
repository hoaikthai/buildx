import { useEffect, useState } from 'react'

interface UseCountUpOptions {
  duration?: number
  delay?: number
  shouldStart?: boolean
}

export function useCountUp(
  target: number,
  options?: UseCountUpOptions
): number {
  const { duration = 1000, delay = 0, shouldStart = true } = options ?? {}
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    const startTime = Date.now() + delay
    const animationFrame = setInterval(() => {
      const now = Date.now()
      const elapsed = now - startTime

      if (elapsed < 0) return

      if (elapsed >= duration) {
        setCount(target)
        clearInterval(animationFrame)
      } else {
        const progress = elapsed / duration
        const easeOutQuad = 1 - (1 - progress) * (1 - progress)
        setCount(Math.floor(target * easeOutQuad))
      }
    }, 16) // ~60fps

    return () => clearInterval(animationFrame)
  }, [target, duration, delay, shouldStart])

  return count
}
