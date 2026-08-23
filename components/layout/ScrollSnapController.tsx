'use client'
import { useEffect, useRef } from 'react'

const SCROLL_DURATION = 800
const WHEEL_THRESHOLD = 4
const TOUCH_THRESHOLD = 40
const TOUCH_DECISION_THRESHOLD = 10

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
}

export function ScrollSnapController() {
  const isAnimating = useRef(false)

  useEffect(() => {
    const container = document.querySelector<HTMLElement>('.snap-container')
    if (!container) return

    function animateTo(target: number) {
      const start = container!.scrollTop
      const distance = target - start
      if (distance === 0) return

      isAnimating.current = true
      container!.style.scrollSnapType = 'none'
      const startTime = performance.now()

      function step(now: number) {
        const progress = Math.min((now - startTime) / SCROLL_DURATION, 1)
        container!.scrollTop = start + distance * easeInOutQuad(progress)
        if (progress < 1) {
          requestAnimationFrame(step)
        } else {
          isAnimating.current = false
          container!.style.scrollSnapType = ''
        }
      }
      requestAnimationFrame(step)
    }

    function goToNearest(direction: 1 | -1) {
      const vh = window.innerHeight
      const sectionCount = container!.children.length
      const currentIndex = Math.round(container!.scrollTop / vh)
      const nextIndex = Math.min(Math.max(currentIndex + direction, 0), sectionCount - 1)
      animateTo(nextIndex * vh)
    }

    function onWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return
      e.preventDefault()
      if (isAnimating.current) return
      goToNearest(e.deltaY > 0 ? 1 : -1)
    }

    let touchStartX = 0
    let touchStartY = 0
    let touchDecision: 'vertical' | 'horizontal' | null = null

    function onTouchStart(e: TouchEvent) {
      const t = e.touches[0]
      touchStartX = t.clientX
      touchStartY = t.clientY
      touchDecision = null
    }

    function onTouchMove(e: TouchEvent) {
      const t = e.touches[0]
      const dx = t.clientX - touchStartX
      const dy = t.clientY - touchStartY

      if (touchDecision === null) {
        if (Math.abs(dx) < TOUCH_DECISION_THRESHOLD && Math.abs(dy) < TOUCH_DECISION_THRESHOLD) return
        touchDecision = Math.abs(dy) > Math.abs(dx) ? 'vertical' : 'horizontal'
      }
      if (touchDecision === 'vertical') e.preventDefault()
    }

    function onTouchEnd(e: TouchEvent) {
      if (touchDecision !== 'vertical' || isAnimating.current) return
      const deltaY = touchStartY - e.changedTouches[0].clientY
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return
      goToNearest(deltaY > 0 ? 1 : -1)
    }

    container.addEventListener('wheel', onWheel, { passive: false })
    container.addEventListener('touchstart', onTouchStart, { passive: true })
    container.addEventListener('touchmove', onTouchMove, { passive: false })
    container.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('touchstart', onTouchStart)
      container.removeEventListener('touchmove', onTouchMove)
      container.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return null
}
