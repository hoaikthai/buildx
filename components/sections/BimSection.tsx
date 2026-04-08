'use client'

import { useEffect, useRef, useState } from 'react'
import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function BimSection() {
  const t = useTranslations('bim')
  const features = t.raw('features') as string[]
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set([0]))
  const scrollRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    itemRefs.current.forEach((el, i) => {
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          setVisibleIndices((prev) => {
            const next = new Set(prev)
            if (entry.isIntersecting) next.add(i)
            else next.delete(i)
            return next
          })
        },
        { root: scrollRef.current, threshold: 0.8 },
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start',
    })
  }

  const minVisible = Math.min(...visibleIndices)
  const maxVisible = Math.max(...visibleIndices)
  const prev = () => scrollTo(Math.max(0, minVisible - 1))
  const next = () => scrollTo(Math.min(features.length - 1, minVisible + 1))

  return (
    <section
      id="bim"
      className="snap-section flex flex-col justify-center"
    >
      <Image
        src="/images/bim-background.avif"
        alt=""
        fill
        className="object-cover dark:hidden"
      />
      <Image
        src="/images/bim-background-dark.avif"
        alt=""
        fill
        className="hidden object-cover dark:block"
      />
      <div className="relative mx-auto w-full max-w-7xl px-8 pt-4 pb-4 md:px-16">
        <AnimatedText>
          <p className="text-gold mb-2 text-xs font-bold tracking-[5px]">
            BIM SOLUTIONS
          </p>
          <h2
            className="mb-3 leading-none font-bold text-(--text-primary)"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
          >
            {t('title')}
          </h2>
          <div className="bg-gold mb-3 h-px w-12" />
          <p
            className="text-gold mb-1 font-semibold"
            style={{ fontSize: '0.95rem' }}
          >
            {t('subtitle')}
          </p>
          <p
            className="mb-4 leading-relaxed text-(--text-muted)"
            style={{ fontSize: '0.9rem' }}
          >
            {t('description')}
          </p>
        </AnimatedText>
      </div>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-8 pb-4 scroll-pl-8 md:px-16 md:scroll-pl-16 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            ref={(el) => {
              itemRefs.current[i] = el
            }}
            className="flex w-[85vw] shrink-0 snap-start flex-col gap-2 h-[40dvh] md:w-[clamp(260px,30vw,400px)] md:h-[50dvh]"
          >
            <h3
              className="shrink-0 font-bold leading-tight text-(--text-primary)"
              style={{ fontSize: '0.875rem' }}
            >
              {feature}
            </h3>
            <div className="relative min-h-0 flex-1 overflow-hidden border border-(--border-subtle)">
              <Image
                src={`/images/bim-${i * 2 + 1}.avif`}
                alt={`${feature} 1`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="relative min-h-0 flex-1 overflow-hidden border border-(--border-subtle)">
              <Image
                src={`/images/bim-${i * 2 + 2}.avif`}
                alt={`${feature} 2`}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom controls: prev — dots — next */}
      <div className="relative flex items-center justify-center gap-4 pt-1 pb-2">
        <button
          onClick={prev}
          disabled={minVisible === 0}
          aria-label="Previous"
          className="text-gold transition-all duration-200 hover:scale-110 disabled:opacity-25"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {features.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                visibleIndices.has(i) ? 'bg-gold w-6' : 'w-1.5 bg-neutral-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={maxVisible === features.length - 1}
          aria-label="Next"
          className="text-gold transition-all duration-200 hover:scale-110 disabled:opacity-25"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}
