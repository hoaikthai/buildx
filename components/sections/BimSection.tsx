'use client';
import {useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

const BIM_IMAGES = [
  'bim-1.avif', 'bim-2.avif', 'bim-3.avif', 'bim-4.avif', 'bim-5.avif',
  'bim-6.avif', 'bim-7.avif', 'bim-8.avif', 'bim-9.avif', 'bim-10.avif',
];

export default function BimSection() {
  const t = useTranslations('bim');
  const features = t.raw('features') as string[];
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, dragFree: true});

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="bim" className="snap-section flex items-center bg-[#0d0d0d]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedText>
            <p className="text-gold text-xs font-bold mb-4" style={{letterSpacing: '5px'}}>
              BIM SOLUTIONS
            </p>
            <h2
              className="text-white font-bold mb-6 leading-none"
              style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
            >
              {t('title')}
            </h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="text-gold font-semibold mb-4" style={{fontSize: '1.05rem'}}>
              {t('subtitle')}
            </p>
            <p className="text-white/60 leading-relaxed mb-10" style={{fontSize: '0.95rem'}}>
              {t('description')}
            </p>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-4 text-white/80">
                  <span
                    className="flex-none text-gold font-bold"
                    style={{fontSize: '1.1rem'}}
                  >
                    0{i + 1}
                  </span>
                  <span className="w-6 h-px bg-gold/40 flex-none" />
                  <span style={{fontSize: '0.95rem'}}>{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <div>
              <div
                className="overflow-hidden"
                ref={emblaRef}
                style={{borderRadius: '2px'}}
              >
                <div className="flex">
                  {BIM_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="flex-none w-full relative"
                      style={{aspectRatio: '16/9'}}
                    >
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
              <div className="flex items-center justify-between mt-5">
                <span className="text-white/30 text-xs" style={{letterSpacing: '3px'}}>
                  DRAG TO EXPLORE
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gold hover:text-black"
                    style={{
                      width: '44px', height: '44px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '18px',
                    }}
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gold hover:text-black"
                    style={{
                      width: '44px', height: '44px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '18px',
                    }}
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
