import Image from 'next/image';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="snap-section flex items-center">
      <Image
        src="/images/contact-background.avif"
        alt=""
        fill
        className="object-cover object-top"
      />
      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <AnimatedText>
            <p className="text-gold text-xs font-bold mb-4 tracking-[5px]">
              CONTACT
            </p>
            <h2
              className="font-bold mb-4 leading-none text-white"
              style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
            >
              {t('title')}
            </h2>
            <div className="w-12 h-px bg-gold mb-10" />

            <div className="space-y-8">
              <div>
                <p className="text-gold text-xs font-bold mb-2 tracking-[4px]">
                  {t('company').toUpperCase()}
                </p>
                <p className="text-white/80">{t('address')}</p>
              </div>
              <div>
                <p className="text-xs uppercase mb-3 tracking-[3px] text-white/60">
                  {t('hotline_label')}
                </p>
                <a
                  href={`tel:${t('hotline').replace(/\s/g, '')}`}
                  className="text-gold font-bold transition-colors"
                  style={{fontSize: 'clamp(1.5rem, 3vw, 2.2rem)'}}
                >
                  {t('hotline')}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase mb-3 tracking-[3px] text-white/60">
                  {t('tax_label')}
                </p>
                <p className="text-white/80">{t('tax')}</p>
              </div>
              <div>
                <p className="text-xs uppercase mb-4 tracking-[3px] text-white/60">
                  {t('follow')}
                </p>
                <div className="flex gap-6">
                  {[
                    {label: 'Facebook', href: 'https://facebook.com'},
                    {label: 'YouTube', href: 'https://youtube.com'},
                    {label: 'TikTok', href: 'https://tiktok.com/@buildxvn'},
                  ].map(({label, href}) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold transition-colors hover:text-gold text-[0.8rem] tracking-[3px] text-white/60"
                    >
                      {label.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="w-full overflow-hidden h-[480px]" style={{filter: 'grayscale(30%)'}}>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
