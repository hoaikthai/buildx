'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

const CARD_NUMS = ['01', '02', '03', '04']
const CARD_BG = [
  'var(--bg-secondary)',
  'var(--bg-card)',
  'var(--bg-primary)',
  'var(--bg-secondary)',
]

export function DesignSection() {
  const t = useTranslations('design')
  const services = t.raw('services') as { name: string; description: string }[]
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="design"
      className="snap-section flex flex-col justify-center bg-[var(--bg-primary)]"
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
        className="flex w-full"
        style={{
          height: 'calc(100vh - 280px)',
          minHeight: '320px',
          maxHeight: '520px',
        }}
      >
        {services.map((service, i) => {
          const isHovered = hovered === i
          const anyHovered = hovered !== null

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-default overflow-hidden"
              style={{
                flex: isHovered ? '4 1 0%' : anyHovered ? '0.5 1 0%' : '1 1 0%',
                transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)',
                background: CARD_BG[i],
                borderRight:
                  i < services.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Large number watermark */}
              <div className="absolute inset-0 flex items-end justify-start p-5">
                <span
                  className="leading-none font-bold text-[var(--border)] select-none"
                  style={{ fontSize: 'clamp(5rem, 12vw, 10rem)' }}
                >
                  {CARD_NUMS[i]}
                </span>
              </div>

              {/* Gold left border on hover */}
              <div
                className="bg-gold absolute top-0 bottom-0 left-0 w-[3px] transition-all duration-500"
                style={{
                  transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                }}
              />

              {/* Number label at top */}
              <div className="absolute top-8 left-6">
                <span className="text-gold text-[0.7rem] font-bold tracking-[3px]">
                  {CARD_NUMS[i]}
                </span>
              </div>

              {/* Content revealed on hover */}
              <div
                className="absolute inset-0 flex min-w-[280px] flex-col justify-center"
                style={{
                  padding: '40px 36px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-16px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transitionDelay: isHovered ? '0.1s' : '0s',
                }}
              >
                <div className="bg-gold mb-6 h-px w-8" />
                <h3
                  className="mb-4 leading-tight font-bold whitespace-nowrap text-(--text-primary)"
                  style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)' }}
                >
                  {service.name}
                </h3>
                <p
                  className="max-w-[320px] leading-relaxed text-(--text-muted)"
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
