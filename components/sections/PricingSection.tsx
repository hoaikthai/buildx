'use client'
import { Image } from '@/components/ui/Image'
import { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { useSwipe } from '@/hooks/useSwipe'

interface PricingPkg {
  name: string
  label: string
  lod?: string
  price: string
  items: string[]
}

function get3DStyle(position: 'active' | 'left' | 'right' | 'hidden') {
  switch (position) {
    case 'active':
      return {
        transform: 'translate(-50%, -50%) scale(1.05)',
        opacity: 1,
        zIndex: 10,
      }
    case 'left':
      return {
        transform:
          'translate(calc(-50% - clamp(250px, 22vw, 360px)), -50%) scale(0.85) perspective(800px) rotateY(15deg)',
        opacity: 0.65,
        zIndex: 5,
      }
    case 'right':
      return {
        transform:
          'translate(calc(-50% + clamp(250px, 22vw, 360px)), -50%) scale(0.85) perspective(800px) rotateY(-15deg)',
        opacity: 0.65,
        zIndex: 5,
      }
    default:
      return {
        transform: 'translate(-50%, -50%) scale(0.7)',
        opacity: 0,
        zIndex: 0,
      }
  }
}

export function PricingSection() {
  const t = useTranslations('pricing')
  const [tab, setTab] = useState<'design' | 'bim'>('design')
  const [activeIndex, setActiveIndex] = useState(1)
  const [cardsVisible, setCardsVisible] = useState(true)
  const switchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const designPackages = t.raw('design_packages') as PricingPkg[]
  const bimPackages = t.raw('bim_packages') as PricingPkg[]
  const packages = tab === 'design' ? designPackages : bimPackages

  function switchTab(next: 'design' | 'bim') {
    if (next === tab) return
    if (switchTimeout.current) clearTimeout(switchTimeout.current)
    setCardsVisible(false)
    switchTimeout.current = setTimeout(() => {
      setTab(next)
      setActiveIndex(1)
      setCardsVisible(true)
    }, 250)
  }

  const swipeHandlers = useSwipe({
    onSwipeLeft: () => setActiveIndex(i => Math.min(i + 1, packages.length - 1)),
    onSwipeRight: () => setActiveIndex(i => Math.max(i - 1, 0)),
  })

  function getPosition(i: number) {
    const diff = i - activeIndex
    if (diff === 0) return 'active'
    if (diff === -1) return 'left'
    if (diff === 1) return 'right'
    return 'hidden'
  }

  return (
    <section id="pricing" className="snap-section flex flex-col justify-center">
      <Image
        src="/images/pricing-background.avif"
        alt=""
        fill
        className="object-cover"
      />
      <div className="relative mx-auto w-full max-w-7xl px-8 md:px-16">
        <AnimatedText>
          <div className="mb-[clamp(0.75rem,2.5vh,2.5rem)] flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-6">
            <div>
              <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
                PRICING
              </p>
              <h2
                className="leading-none font-bold text-(--text-primary)"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
              >
                {t('title')}
              </h2>
              <div className="bg-gold mt-4 h-px w-12" />
            </div>
            <div className="flex overflow-hidden border border-(--border-subtle)">
              {(['design', 'bim'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => switchTab(key)}
                  className={`cursor-pointer px-8 py-3 text-xs font-bold tracking-[3px] uppercase transition-all duration-200 ${
                    tab === key
                      ? 'bg-gold text-black'
                      : 'bg-transparent text-(--text-muted)'
                  }`}
                >
                  {t(key === 'design' ? 'design_tab' : 'bim_tab')}
                </button>
              ))}
            </div>
          </div>
        </AnimatedText>

        {/* 3D Carousel */}
        <div
          className="relative h-[clamp(260px,42vh,560px)] w-full transition-all duration-250"
          style={{
            perspective: '1200px',
            opacity: cardsVisible ? 1 : 0,
            transform: cardsVisible ? 'translateY(0)' : 'translateY(12px)',
          }}
          {...swipeHandlers}
        >
          {packages.map((pkg, i) => {
            const pos = getPosition(i)
            const posStyle = get3DStyle(
              pos as 'active' | 'left' | 'right' | 'hidden',
            )

            return (
              <div
                key={`${tab}-${i}`}
                onClick={() => setActiveIndex(i)}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  width: 'clamp(320px, 28vw, 480px)',
                  ...posStyle,
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background:
                      pos === 'active'
                        ? 'var(--bg-card)'
                        : 'var(--bg-card-alt)',
                    border:
                      pos === 'active'
                        ? '1px solid rgba(255,184,0,0.3)'
                        : '1px solid var(--border)',
                  }}
                >
                  {/* Header gradient */}
                  <div
                    className="p-[clamp(1rem,2vh,1.75rem)] px-8"
                    style={{
                      background:
                        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                    }}
                  >
                    <p className="mb-1 text-xs font-bold tracking-[3px] text-black/60">
                      {pkg.name}
                    </p>
                    <h3 className="text-[clamp(1.1rem,2vh,1.75rem)] font-bold text-black">
                      {pkg.label}
                    </h3>
                    <p className="text-[clamp(0.875rem,1.5vh,1.25rem)] font-bold text-black">
                      {pkg.lod}
                    </p>
                    <div className="mt-[clamp(0.5rem,1vh,1rem)]">
                      <span className="text-[clamp(1.5rem,3vh,2.75rem)] font-bold text-black">
                        {pkg.price}
                      </span>
                      <span className="ml-2 text-sm text-black/60">
                        {t('unit')}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-[clamp(0.75rem,1.5vh,1.5rem)] px-8">
                    <p className="mb-[clamp(0.5rem,1vh,1rem)] text-[0.75rem] font-bold tracking-[3px] text-(--text-subtle)">
                      {t('includes').toUpperCase()}
                    </p>
                    <ul className="space-y-[clamp(0.35rem,0.8vh,0.875rem)]">
                      {pkg.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-[clamp(0.8125rem,1.2vh,0.9375rem)] text-(--text-muted)"
                        >
                          <span className="text-gold mt-0.5 flex-none">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* BIM note — always rendered to reserve space, hidden on design tab */}
        <div
          className={`border-gold/30 bg-gold/40 mx-auto mt-[clamp(0.5rem,3vh,1.5rem)] max-w-xl rounded-xl border p-[clamp(0.75rem,1.5vh,1.25rem)] transition-opacity duration-300 ${tab === 'bim' ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        >
          <ul className="space-y-1.5">
            {(t.raw('bim_note_items') as string[]).map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-(--text-muted)"
              >
                <span className="mt-0.5 flex-none text-black">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
