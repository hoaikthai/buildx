import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedText>
            <SectionTitle title={t('title')} />
            <div className="space-y-8">
              <div>
                <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-2">
                  {t('company')}
                </p>
                <p className="text-white/70">{t('address')}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                  {t('hotline_label')}
                </p>
                <a
                  href={`tel:${t('hotline').replace(/\s/g, '')}`}
                  className="text-[#FFB800] text-2xl font-bold hover:text-white transition-colors"
                >
                  {t('hotline')}
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                  {t('tax_label')}
                </p>
                <p className="text-white/70">{t('tax')}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
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
                      className="text-white/50 hover:text-[#FFB800] transition-colors text-sm font-bold tracking-widest uppercase"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="w-full h-80 lg:h-full min-h-[320px] bg-[#1a1a1a] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.8559373694!2d108.19840491536485!3d16.02435288886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142190c3a692f33%3A0x79671c6d3a55c0b1!2zxJDGsOG7nW5nIFh1w6JuIFRodeG7p3ksIEPhuqltIEzhu4csIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2svn!4v1617000000000"
                width="100%"
                height="100%"
                style={{border: 0, filter: 'invert(90%) hue-rotate(180deg)'}}
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
