import Image from 'next/image';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

export default function ConstructionSection() {
  const t = useTranslations('construction');

  return (
    <section id="construction" className="snap-section flex items-center bg-[#111]">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{minHeight: '100vh'}}>
          {/* Image fills left half */}
          <AnimatedText delay={0.1} className="relative">
            <div className="relative w-full h-full" style={{minHeight: '50vh'}}>
              <Image
                src="/images/bim-5.avif"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0" style={{background: 'linear-gradient(to right, transparent 70%, #111 100%)'}} />
            </div>
          </AnimatedText>

          {/* Text right half */}
          <AnimatedText className="flex flex-col justify-center px-12 lg:px-16 py-20">
            <p className="text-[#FFB800] text-xs font-bold mb-4" style={{letterSpacing: '5px'}}>
              CONSTRUCTION
            </p>
            <h2
              className="text-white font-bold mb-6 leading-none"
              style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
            >
              {t('title')}
            </h2>
            <div className="w-12 h-px bg-[#FFB800] mb-8" />
            <p className="text-white/70 leading-relaxed" style={{fontSize: '1.05rem', maxWidth: '480px'}}>
              {t('description')}
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
