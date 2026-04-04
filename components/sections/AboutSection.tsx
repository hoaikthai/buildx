import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

export function AboutSection() {
  const t = useTranslations('about')

  return (
    <section id="about" className="snap-section flex items-center">
      <Image
        src="/images/about-background.avif"
        alt=""
        fill
        className="object-cover"
      />
      <div className="relative mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <AnimatedText>
            <p className="text-gold text-xxl mb-4 font-bold tracking-[5px]">
              BUILDX
            </p>
            <h2
              className="leading-none font-bold text-black"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-4 h-px w-12" />
            <p
              className="mb-10 leading-relaxed text-black/70"
              style={{ fontSize: '1rem' }}
            >
              {t('headline')}
            </p>
            <div className="space-y-8">
              <div>
                <p className="text-gold mb-3 text-xs font-bold tracking-[4px]">
                  {t('vision_label').toUpperCase()}
                </p>
                <p
                  className="leading-relaxed text-black/70"
                  style={{ fontSize: '1rem' }}
                >
                  {t('vision')}
                </p>
              </div>
              <div>
                <p className="text-gold mb-3 text-xs font-bold tracking-[4px]">
                  {t('mission_label').toUpperCase()}
                </p>
                <p
                  className="leading-relaxed text-black/70"
                  style={{ fontSize: '1rem' }}
                >
                  {t('mission')}
                </p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="relative mx-auto aspect-square max-w-130">
              <Image
                src="/images/about.avif"
                alt="About BuildX"
                fill
                className="object-cover"
              />
              <div
                className="absolute -bottom-5 -left-5 h-28 w-28"
                style={{
                  borderLeft: '2px solid #FFB800',
                  borderBottom: '2px solid #FFB800',
                }}
              />
              <div
                className="absolute -top-5 -right-5 h-28 w-28"
                style={{
                  borderRight: '2px solid #FFB800',
                  borderTop: '2px solid #FFB800',
                }}
              />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
