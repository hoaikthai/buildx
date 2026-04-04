import Image from 'next/image';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

export function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="snap-section flex items-center bg-[var(--bg-primary)]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedText>
            <p className="text-gold text-xs font-bold mb-4 tracking-[5px]">
              BUILDX
            </p>
            <h2
              className="font-bold mb-10 leading-none text-[var(--text-primary)]"
              style={{fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'}}
            >
              {t('title')}
            </h2>
            <div className="w-12 h-px bg-gold mb-10" />
            <div className="space-y-8">
              <div>
                <p className="text-gold text-xs font-bold mb-3 tracking-[4px]">
                  {t('vision_label').toUpperCase()}
                </p>
                <p className="leading-relaxed text-[var(--text-muted)]" style={{fontSize: '1rem'}}>
                  {t('vision')}
                </p>
              </div>
              <div>
                <p className="text-gold text-xs font-bold mb-3 tracking-[4px]">
                  {t('mission_label').toUpperCase()}
                </p>
                <p className="leading-relaxed text-[var(--text-muted)]" style={{fontSize: '1rem'}}>
                  {t('mission')}
                </p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="relative aspect-square max-w-[520px] mx-auto">
              <Image
                src="/images/about.avif"
                alt="About BuildX"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-5 -left-5 w-28 h-28" style={{borderLeft: '2px solid #FFB800', borderBottom: '2px solid #FFB800'}} />
              <div className="absolute -top-5 -right-5 w-28 h-28" style={{borderRight: '2px solid #FFB800', borderTop: '2px solid #FFB800'}} />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
