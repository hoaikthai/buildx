'use client'
import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { useEffect, useState } from 'react'

const IMAGES = [
  '/images/construction-1.avif',
  '/images/construction-2.avif',
  '/images/construction-3.avif',
]

export function ConstructionSection() {
  const t = useTranslations('construction')
  const features = t.raw('features') as string[]
  const stats = t.raw('stats') as { value: string; label: string }[]
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % IMAGES.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="construction"
      className="snap-section flex items-center bg-(--bg-primary)"
    >
      <div className="h-full w-full">
        <div className="grid h-full grid-cols-1 lg:grid-cols-2">
          <AnimatedText delay={0.1} className="relative">
            <div className="relative h-full min-h-[30vh] w-full overflow-hidden">
              {IMAGES.map((src, i) => (
                <Image
                  key={src}
                  src={src}
                  alt="Construction"
                  fill
                  className={`object-cover transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
                />
              ))}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_70%,var(--bg-primary)_100%)]" />
            </div>
          </AnimatedText>

          <AnimatedText className="flex flex-col justify-center px-12 py-10 lg:px-16">
            <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
              CONSTRUCTION
            </p>
            <h2 className="mb-6 text-[clamp(2.5rem,4.5vw,4rem)] leading-none font-bold text-(--text-primary)">
              {t('title')}
            </h2>
            <div className="bg-gold mb-6 h-px w-12" />
            <p className="mb-8 max-w-[480px] text-[1.05rem] leading-relaxed text-(--text-muted)">
              {t('description')}
            </p>

            <ul className="mb-10 space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[0.95rem] text-(--text-muted)">
                  <span className="bg-gold mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="border-t border-(--border-subtle) pt-8">
              <div className="flex gap-10">
                {stats.map((stat, i) => (
                  <div key={i}>
                    <p className="text-gold text-[clamp(1.5rem,2.5vw,2rem)] font-bold leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-xs tracking-wide text-(--text-muted) uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
