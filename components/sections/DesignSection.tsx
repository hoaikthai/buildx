'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

const CARD_IMAGES = [
  {bg: '#0d0d0d', num: '01'},
  {bg: '#0a0a0a', num: '02'},
  {bg: '#111', num: '03'},
  {bg: '#0d0d0d', num: '04'},
];

export default function DesignSection() {
  const t = useTranslations('design');
  const services = t.raw('services') as {name: string; description: string}[];
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="design" className="snap-section flex flex-col justify-center bg-[#111]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-8">
        <AnimatedText>
          <p className="text-gold text-xs font-bold mb-4" style={{letterSpacing: '5px'}}>
            SERVICES
          </p>
          <h2
            className="text-white font-bold mb-3 leading-none"
            style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
          >
            {t('title')}
          </h2>
          <div className="w-12 h-px bg-gold mb-3" />
          <p className="text-white/50 mb-8" style={{fontSize: '0.95rem'}}>
            {t('description')}
          </p>
        </AnimatedText>
      </div>

      {/* Hover-expanding accordion cards */}
      <div
        className="flex w-full"
        style={{
          height: 'calc(100vh - 280px)',
          minHeight: '320px',
          maxHeight: '520px',
        }}
      >
        {services.map((service, i) => {
          const isHovered = hovered === i;
          const anyHovered = hovered !== null;

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative overflow-hidden cursor-default"
              style={{
                flex: isHovered ? '4 1 0%' : anyHovered ? '0.5 1 0%' : '1 1 0%',
                transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)',
                background: CARD_IMAGES[i].bg,
                borderRight: i < services.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
              }}
            >
              {/* Large number watermark */}
              <div
                className="absolute inset-0 flex items-end justify-start"
                style={{padding: '20px 24px'}}
              >
                <span
                  className="font-bold text-white/5 leading-none select-none"
                  style={{fontSize: 'clamp(5rem, 12vw, 10rem)'}}
                >
                  {CARD_IMAGES[i].num}
                </span>
              </div>

              {/* Gold left border on hover */}
              <div
                className="absolute left-0 top-0 bottom-0 transition-all duration-500"
                style={{
                  width: '3px',
                  background: '#FFB800',
                  transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                }}
              />

              {/* Always visible: number label at top */}
              <div className="absolute top-8 left-6">
                <span
                  className="text-gold font-bold"
                  style={{fontSize: '0.7rem', letterSpacing: '3px'}}
                >
                  {CARD_IMAGES[i].num}
                </span>
              </div>

              {/* Content revealed on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  padding: '40px 36px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-16px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transitionDelay: isHovered ? '0.1s' : '0s',
                  minWidth: '280px',
                }}
              >
                <div className="w-8 h-px bg-gold mb-6" />
                <h3
                  className="text-white font-bold mb-4 leading-tight"
                  style={{fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', whiteSpace: 'nowrap'}}
                >
                  {service.name}
                </h3>
                <p
                  className="text-white/60 leading-relaxed"
                  style={{fontSize: '0.9rem', maxWidth: '320px'}}
                >
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
