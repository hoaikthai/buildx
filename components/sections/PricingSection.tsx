'use client';
import {useState} from 'react';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

interface PricingPkg {
  name: string;
  label: string;
  price: string;
  items: string[];
}

function get3DStyle(position: 'active' | 'left' | 'right' | 'hidden') {
  const base = 'absolute top-1/2 left-1/2 transition-all duration-500';
  switch (position) {
    case 'active':
      return {
        className: base,
        style: {
          transform: 'translate(-50%, -50%) scale(1.05)',
          opacity: 1,
          zIndex: 10,
        },
      };
    case 'left':
      return {
        className: base,
        style: {
          transform: 'translate(calc(-50% - 300px), -50%) scale(0.85) perspective(800px) rotateY(15deg)',
          opacity: 0.65,
          zIndex: 5,
        },
      };
    case 'right':
      return {
        className: base,
        style: {
          transform: 'translate(calc(-50% + 300px), -50%) scale(0.85) perspective(800px) rotateY(-15deg)',
          opacity: 0.65,
          zIndex: 5,
        },
      };
    default:
      return {
        className: base,
        style: {transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0, zIndex: 0},
      };
  }
}

export default function PricingSection() {
  const t = useTranslations('pricing');
  const [tab, setTab] = useState<'design' | 'bim'>('design');
  const [activeIndex, setActiveIndex] = useState(1);

  const designPackages = t.raw('design_packages') as PricingPkg[];
  const bimPackages = t.raw('bim_packages') as PricingPkg[];
  const packages = tab === 'design' ? designPackages : bimPackages;

  function getPosition(i: number) {
    const diff = i - activeIndex;
    if (diff === 0) return 'active';
    if (diff === -1) return 'left';
    if (diff === 1) return 'right';
    return 'hidden';
  }

  return (
    <section id="pricing" className="snap-section flex flex-col justify-center bg-[#0d0d0d]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16">
        <AnimatedText>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <p className="text-[#FFB800] text-xs font-bold mb-4" style={{letterSpacing: '5px'}}>
                PRICING
              </p>
              <h2
                className="text-white font-bold leading-none"
                style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
              >
                {t('title')}
              </h2>
              <div className="w-12 h-px bg-[#FFB800] mt-4" />
            </div>
            <div
              className="flex overflow-hidden"
              style={{border: '1px solid rgba(255,255,255,0.15)'}}
            >
              {(['design', 'bim'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => { setTab(key); setActiveIndex(1); }}
                  className="px-8 py-3 text-xs font-bold uppercase cursor-pointer transition-all duration-200"
                  style={{
                    letterSpacing: '3px',
                    background: tab === key ? '#FFB800' : 'transparent',
                    color: tab === key ? '#111' : 'rgba(255,255,255,0.5)',
                  }}
                >
                  {t(key === 'design' ? 'design_tab' : 'bim_tab')}
                </button>
              ))}
            </div>
          </div>
        </AnimatedText>

        {/* 3D Carousel */}
        <div
          className="relative w-full"
          style={{height: '420px', perspective: '1200px'}}
        >
          {packages.map((pkg, i) => {
            const pos = getPosition(i);
            const {style} = get3DStyle(pos as 'active' | 'left' | 'right' | 'hidden');

            return (
              <div
                key={`${tab}-${i}`}
                onClick={() => setActiveIndex(i)}
                className="cursor-pointer"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'min(360px, 85vw)',
                  ...style,
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                {/* Card */}
                <div
                  style={{
                    background: pos === 'active' ? '#1a1a1a' : '#141414',
                    border: pos === 'active' ? '1px solid rgba(255,184,0,0.3)' : '1px solid rgba(255,255,255,0.06)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header gradient */}
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                      padding: '28px 32px',
                    }}
                  >
                    <p className="text-black/60 text-xs font-bold mb-1" style={{letterSpacing: '3px'}}>
                      {pkg.name}
                    </p>
                    <h3 className="text-black font-bold" style={{fontSize: '1.3rem'}}>
                      {pkg.label}
                    </h3>
                    <div className="mt-4">
                      <span className="text-black font-bold" style={{fontSize: '2rem'}}>
                        {pkg.price}
                      </span>
                      <span className="text-black/60 text-sm ml-2">{t('unit')}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{padding: '24px 32px'}}>
                    <p
                      className="text-white/30 font-bold mb-4"
                      style={{fontSize: '0.7rem', letterSpacing: '3px'}}
                    >
                      {t('includes').toUpperCase()}
                    </p>
                    <ul className="space-y-3">
                      {pkg.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3" style={{fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)'}}>
                          <span className="text-[#FFB800] flex-none mt-0.5">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel nav dots */}
        <div className="flex justify-center gap-3 mt-4">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="cursor-pointer transition-all duration-200 rounded-full"
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                background: i === activeIndex ? '#FFB800' : 'rgba(255,255,255,0.2)',
              }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
