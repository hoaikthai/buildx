import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'

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
                    {
                      label: 'Facebook',
                      href: 'https://facebook.com',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'YouTube',
                      href: 'https://youtube.com',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                    },
                    {
                      label: 'TikTok',
                      href: 'https://tiktok.com/@buildxvn',
                      icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
                        </svg>
                      ),
                    },
                  ].map(({ label, href, icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="hover:text-gold text-white/60 transition-colors"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div
              className="h-120 w-full overflow-hidden"
              style={{ filter: 'grayscale(30%)' }}
            ></div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
