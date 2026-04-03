import Image from 'next/image';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

export default function ConstructionSection() {
  const t = useTranslations('construction');

  return (
    <section id="construction" className="py-24 md:py-32 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedText delay={0.1}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/images/bim-5.png"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/40 to-transparent" />
            </div>
          </AnimatedText>

          <AnimatedText>
            <SectionTitle title={t('title')} />
            <p className="text-white/70 leading-relaxed text-lg">{t('description')}</p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
