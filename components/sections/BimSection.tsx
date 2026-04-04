import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'

export function BimSection() {
  const t = useTranslations('bim')
  const features = t.raw('features') as string[]

  return (
    <section
      id="bim"
      className="snap-section flex flex-col justify-center bg-(--bg-secondary)"
    >
      <div className="mx-auto w-full max-w-7xl px-8 pt-4 pb-6 md:px-16">
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
            className="mb-6 leading-relaxed text-(--text-muted)"
            style={{ fontSize: '0.9rem' }}
          >
            {t('description')}
          </p>
        </AnimatedText>

        <div
          className="grid grid-cols-2 gap-4 lg:grid-cols-3"
          style={{
            height: 'calc(100dvh - 320px)',
            minHeight: '320px',
            maxHeight: '520px',
          }}
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="group flex flex-col overflow-hidden border border-(--border-subtle) bg-(--bg-primary)"
            >
              <div className="relative min-h-0 grow overflow-hidden">
                <Image
                  src={`/images/bim-${i + 1}.avif`}
                  alt={feature}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="shrink-0 p-4">
                <h3
                  className="font-bold leading-tight text-(--text-primary)"
                  style={{ fontSize: '0.875rem' }}
                >
                  {feature}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
