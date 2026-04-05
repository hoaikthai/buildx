'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Image } from '@/components/ui/Image'
import { AnimatedText } from '@/components/ui/AnimatedText'

const CARD_NUMBERS = ['01', '02', '03', '04']
const CARD_IMAGES = [
  '/images/design-interior-1.avif',
  '/images/design-interior-1.avif',
  '/images/design-interior-1.avif',
  '/images/design-exterior-1.avif',
]

export function DesignSection() {
  const t = useTranslations('design')
  const services = t.raw('services') as { name: string; description: string }[]
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="design"
      className="snap-section flex flex-col justify-center bg-(--bg-primary)"
    >
      <div className="mx-auto w-full max-w-7xl px-8 pt-20 pb-8 md:px-16">
        <AnimatedText>
          <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
            SERVICES
          </p>
          <h2
            className="mb-3 leading-none font-bold text-(--text-primary)"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
          >
            {t('title')}
          </h2>
          <div className="bg-gold mb-3 h-px w-12" />
          <p
            className="mb-8 text-(--text-muted)"
            style={{ fontSize: '0.95rem' }}
          >
            {t('description')}
          </p>
        </AnimatedText>
      </div>

      <div
        className="flex w-full min-h-80 h-[calc(100dvh-280px)]"
        onTouchStart={() => setHovered(null)}
      >
        {services.map((service, i) => {
          const isHovered = hovered === i
          const anyHovered = hovered !== null

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onTouchStart={(e) => { e.stopPropagation(); setHovered(isHovered ? null : i) }}
              className="relative cursor-default overflow-hidden"
              style={{
                flex: isHovered ? '2 1 0%' : anyHovered ? '0.5 1 0%' : '1 1 0%',
                transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)',
                borderRight:
                  i < services.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Background image */}
              <Image
                src={CARD_IMAGES[i]}
                alt={`service-${CARD_NUMBERS[i]}`}
                fill
                className="object-cover"
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 bg-black transition-opacity duration-500"
                style={{ opacity: isHovered ? 0.4 : 0.65 }}
              />

              {/* Large number watermark */}
              <div className="absolute inset-0 flex items-end justify-start p-5">
                <span
                  className="leading-none font-bold text-white/20 select-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
                >
                  {CARD_NUMBERS[i]}
                </span>
              </div>

              {/* Gold left border on hover */}
              <div
                className="bg-gold absolute top-0 bottom-0 left-0 w-0.75 transition-all duration-500"
                style={{
                  transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                }}
              />

              {/* Content revealed on hover */}
              <div
                className="absolute inset-0 flex min-w-70 flex-col justify-center"
                style={{
                  padding: '40px 36px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-16px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transitionDelay: isHovered ? '0.1s' : '0s',
                }}
              >
                <h3
                  className="mb-4 leading-tight font-bold whitespace-nowrap text-white"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-[320px] leading-relaxed text-white/75"
                  style={{ fontSize: '0.9rem' }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
