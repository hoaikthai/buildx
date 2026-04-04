import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

export function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section id="contact" className="snap-section flex items-center">
      <Image
        src="/images/contact-background.avif"
        alt=""
        fill
        className="object-cover object-top"
      />
      <div className="relative mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <AnimatedText>
            <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
              CONTACT
            </p>
            <h2
              className="mb-4 leading-none font-bold text-white"
              style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-10 h-px w-12" />

            <div className="space-y-8">
              <div>
                <p className="text-gold mb-2 text-xs font-bold tracking-[4px]">
                  {t('company').toUpperCase()}
                </p>
                <p className="text-white/80">{t('address')}</p>
              </div>
              <div>
                <p className="mb-3 text-xs tracking-[3px] text-white/60 uppercase">
                  {t('hotline_label')}
                </p>
                <a
                  href={`tel:${t('hotline').replace(/\s/g, '')}`}
                  className="text-gold font-bold transition-colors"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
                >
                  {t('hotline')}
                </a>
              </div>
              <div>
                <p className="mb-3 text-xs tracking-[3px] text-white/60 uppercase">
                  {t('tax_label')}
                </p>
                <p className="text-white/80">{t('tax')}</p>
              </div>
              <div>
                <p className="mb-4 text-xs tracking-[3px] text-white/60 uppercase">
                  {t('follow')}
                </p>
                <div className="flex gap-6">
                  {[
                    { label: 'Facebook', href: 'https://facebook.com' },
                    { label: 'YouTube', href: 'https://youtube.com' },
                    { label: 'TikTok', href: 'https://tiktok.com/@buildxvn' },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold text-[0.8rem] font-bold tracking-[3px] text-white/60 transition-colors"
                    >
                      {label.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div
              className="h-[480px] w-full overflow-hidden"
              style={{ filter: 'grayscale(30%)' }}
            ></div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
