import Image from 'next/image';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

export function ConstructionSection() {
  const t = useTranslations('construction');

  return (
    <section id="construction" className="snap-section flex items-center bg-[var(--bg-primary)]">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <AnimatedText delay={0.1} className="relative">
            <div className="relative w-full h-full min-h-[50vh]">
              <Image
                src="/images/bim-5.avif"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{background: 'linear-gradient(to right, transparent 70%, var(--bg-primary) 100%)'}} />
            </div>
          </AnimatedText>

          <AnimatedText className="flex flex-col justify-center px-12 lg:px-16 py-20">
            <p className="text-gold text-xs font-bold mb-4 tracking-[5px]">
              CONSTRUCTION
            </p>
            <h2
              className="font-bold mb-6 leading-none text-(--text-primary)"
              style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
            >
              {t('title')}
            </h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="leading-relaxed text-(--text-muted) max-w-[480px]" style={{fontSize: '1.05rem'}}>
              {t('description')}
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
