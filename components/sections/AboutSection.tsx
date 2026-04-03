import Image from 'next/image';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedText>
            <SectionTitle title={t('title')} />
            <div className="space-y-10">
              <div>
                <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-3">
                  {t('vision_label')}
                </p>
                <p className="text-white/80 leading-relaxed">{t('vision')}</p>
              </div>
              <div>
                <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-3">
                  {t('mission_label')}
                </p>
                <p className="text-white/80 leading-relaxed">{t('mission')}</p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              <Image
                src="/images/about.png"
                alt="About BuildX"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-[#FFB800]" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-[#FFB800]" />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
