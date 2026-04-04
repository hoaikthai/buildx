'use client'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

const BIM_IMAGES = [
  'bim-1.avif',
  'bim-2.avif',
  'bim-3.avif',
  'bim-4.avif',
  'bim-5.avif',
  'bim-6.avif',
  'bim-7.avif',
  'bim-8.avif',
  'bim-9.avif',
  'bim-10.avif',
]

export function BimSection() {
  const t = useTranslations('bim')
  const features = t.raw('features') as string[]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true })

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section
      id="bim"
      className="snap-section flex items-center bg-(--bg-secondary)"
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimatedText>
            <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
              BIM SOLUTIONS
            </p>
            <h2
              className="mb-6 leading-none font-bold text-(--text-primary)"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-8 h-px w-12" />
            <p
              className="text-gold mb-4 font-semibold"
              style={{ fontSize: '1.05rem' }}
            >
              {t('subtitle')}
            </p>
            <p
              className="mb-10 leading-relaxed text-(--text-muted)"
              style={{ fontSize: '0.95rem' }}
            >
              {t('description')}
            </p>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4 text-(--text-primary)"
                >
                  <span
                    className="text-gold flex-none font-bold"
                    style={{ fontSize: '1.1rem' }}
                  >
                    0{i + 1}
                  </span>
                  <span className="bg-gold/40 h-px w-6 flex-none" />
                  <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <div>
              <div className="overflow-hidden rounded-xs" ref={emblaRef}>
                <div className="flex">
                  {BIM_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-video w-full flex-none"
                    >
                      <Image
                        src={`/images/${img}`}
                        alt={`BIM project ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="hover:bg-gold text-(--text-muted)text-lg flex h-11 w-11 cursor-pointer items-center justify-center border border-(--border-subtle) transition-all duration-200 hover:text-black"
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="hover:bg-gold text-(--text-muted)text-lg flex h-11 w-11 cursor-pointer items-center justify-center border border-(--border-subtle) transition-all duration-200 hover:text-black"
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
