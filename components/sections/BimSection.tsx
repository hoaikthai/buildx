'use client';
import {useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

const BIM_IMAGES = [
  'bim-1.png', 'bim-2.png', 'bim-3.png', 'bim-4.png', 'bim-5.png',
  'bim-6.png', 'bim-7.png', 'bim-8.png', 'bim-9.png', 'bim-10.png',
];

export default function BimSection() {
  const t = useTranslations('bim');
  const features = t.raw('features') as string[];
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, dragFree: true});

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="bim" className="py-24 md:py-32 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <AnimatedText>
            <SectionTitle title={t('title')} label="BIM" />
            <p className="text-[#FFB800] font-bold text-lg mb-4">{t('subtitle')}</p>
            <p className="text-white/70 leading-relaxed mb-8">{t('description')}</p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] flex-none" />
                  {feature}
                </li>
              ))}
            </ul>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {BIM_IMAGES.map((img, i) => (
                    <div key={i} className="flex-none w-full relative aspect-video">
                      <Image
                        src={`/images/${img}`}
                        alt={`BIM project ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-white/20 hover:border-[#FFB800] text-white/60 hover:text-[#FFB800] transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-white/20 hover:border-[#FFB800] text-white/60 hover:text-[#FFB800] transition-all flex items-center justify-center cursor-pointer"
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
