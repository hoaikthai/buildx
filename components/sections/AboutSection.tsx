import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function AboutSection() {
  const t = useTranslations('about')

  return (
    <section id="about" className="snap-section flex items-center">
      <Image
        src="/images/about-background.avif"
        alt=""
        fill
        className="object-cover dark:hidden"
      />
      <Image
        src="/images/about-background-dark.avif"
        alt=""
        fill
        className="hidden object-cover dark:block"
      />
      <div className="relative mx-auto w-full max-w-7xl px-6 py-10 md:px-12">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <AnimatedText>
            <p className="text-gold text-4xl mb-4 font-bold tracking-[5px]">
              BUILDX
            </p>
            <h2
              className="leading-none font-bold text-(--text-primary)"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-4 h-px w-12" />
            <div className="space-y-6">
              <p
                className="leading-relaxed text-(--text-muted)"
                style={{ fontSize: '1rem' }}
              >
                {t('description_1')}
              </p>
              <p
                className="leading-relaxed text-(--text-muted)"
                style={{ fontSize: '1rem' }}
              >
                {t('description_2')}
              </p>
            </div>
            <a
              href="#bim"
              className="bg-gold mt-8 inline-block px-8 py-4 text-sm font-bold tracking-[2px] text-white transition-opacity hover:opacity-90"
            >
              {t('cta').toUpperCase()} »
            </a>
          </AnimatedText>

          <AnimatedText delay={0.2} className="hidden lg:block">
            <div className="relative mx-auto aspect-square max-w-150">
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
