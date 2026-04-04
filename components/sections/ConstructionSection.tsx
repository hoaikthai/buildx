import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function ConstructionSection() {
  const t = useTranslations('construction')

  return (
    <section
      id="construction"
      className="snap-section flex items-center bg-[var(--bg-primary)]"
    >
      <div className="w-full">
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          <AnimatedText delay={0.1} className="relative">
            <div className="relative h-full min-h-[50vh] w-full">
              <Image
                src="/images/bim-5.avif"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, transparent 70%, var(--bg-primary) 100%)',
                }}
              />
            </div>
          </AnimatedText>

          <AnimatedText className="flex flex-col justify-center px-12 py-20 lg:px-16">
            <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
              CONSTRUCTION
            </p>
            <h2
              className="mb-6 leading-none font-bold text-(--text-primary)"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-8 h-px w-12" />
            <p
              className="max-w-[480px] leading-relaxed text-(--text-muted)"
              style={{ fontSize: '1.05rem' }}
            >
              {t('description')}
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
