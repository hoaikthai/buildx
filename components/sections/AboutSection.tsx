import Image from 'next/image';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="snap-section flex items-center bg-[#111]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <AnimatedText>
            <p className="text-[#FFB800] text-xs font-bold mb-4" style={{letterSpacing: '5px'}}>
              BUILDX
            </p>
            <h2
              className="text-white font-bold mb-10 leading-none"
              style={{fontSize: 'clamp(2.5rem, 5vw, 4.5rem)'}}
            >
              {t('title')}
            </h2>
            <div className="w-12 h-px bg-[#FFB800] mb-10" />
            <div className="space-y-8">
              <div>
                <p className="text-[#FFB800] text-xs font-bold mb-3" style={{letterSpacing: '4px'}}>
                  {t('vision_label').toUpperCase()}
                </p>
                <p className="text-white/70 leading-relaxed" style={{fontSize: '1rem'}}>
                  {t('vision')}
                </p>
              </div>
              <div>
                <p className="text-[#FFB800] text-xs font-bold mb-3" style={{letterSpacing: '4px'}}>
                  {t('mission_label').toUpperCase()}
                </p>
                <p className="text-white/70 leading-relaxed" style={{fontSize: '1rem'}}>
                  {t('mission')}
                </p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="relative" style={{aspectRatio: '1/1', maxWidth: '520px', margin: '0 auto'}}>
              <Image
                src="/images/about.avif"
                alt="About BuildX"
                fill
                className="object-cover"
              />
              {/* Gold corner accents */}
              <div className="absolute -bottom-5 -left-5 w-28 h-28" style={{borderLeft: '2px solid #FFB800', borderBottom: '2px solid #FFB800'}} />
              <div className="absolute -top-5 -right-5 w-28 h-28" style={{borderRight: '2px solid #FFB800', borderTop: '2px solid #FFB800'}} />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
