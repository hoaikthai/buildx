import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

export function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="snap-section flex items-center bg-[var(--bg-secondary)]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <AnimatedText>
            <p className="text-gold text-xs font-bold mb-4 tracking-[5px]">
              CONTACT
            </p>
            <h2
              className="font-bold mb-4 leading-none text-[var(--text-primary)]"
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
                <p className="text-[var(--text-muted)]">{t('address')}</p>
              </div>
              <div>
                <p className="text-xs uppercase mb-3 tracking-[3px] text-[var(--text-subtle)]">
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
                <p className="text-xs uppercase mb-3 tracking-[3px] text-[var(--text-subtle)]">
                  {t('tax_label')}
                </p>
                <p className="text-[var(--text-muted)]">{t('tax')}</p>
              </div>
              <div>
                <p className="text-xs uppercase mb-4 tracking-[3px] text-[var(--text-subtle)]">
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
                      className="font-bold transition-colors hover:text-gold text-[0.8rem] tracking-[3px] text-[var(--text-subtle)]"
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.8559373694!2d108.19840491536485!3d16.02435288886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142190c3a692f33%3A0x79671c6d3a55c0b1!2zxJDGsOG7nW5nIFh1w6JuIFRodeG7p3ksIEPhuqltIEzhu4csIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2svn!4v1617000000000"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BuildX location"
              />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
