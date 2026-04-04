'use client';
import Image from 'next/image';
import {useState, useRef} from 'react';
import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';

interface PricingPkg {
  name: string;
  label: string;
  price: string;
  items: string[];
}

function get3DStyle(position: 'active' | 'left' | 'right' | 'hidden') {
  switch (position) {
    case 'active':
      return {transform: 'translate(-50%, -50%) scale(1.05)', opacity: 1, zIndex: 10};
    case 'left':
      return {transform: 'translate(calc(-50% - 300px), -50%) scale(0.85) perspective(800px) rotateY(15deg)', opacity: 0.65, zIndex: 5};
    case 'right':
      return {transform: 'translate(calc(-50% + 300px), -50%) scale(0.85) perspective(800px) rotateY(-15deg)', opacity: 0.65, zIndex: 5};
    default:
      return {transform: 'translate(-50%, -50%) scale(0.7)', opacity: 0, zIndex: 0};
  }
}

export function PricingSection() {
  const t = useTranslations('pricing');
  const [tab, setTab] = useState<'design' | 'bim'>('design');
  const [activeIndex, setActiveIndex] = useState(1);
  const [cardsVisible, setCardsVisible] = useState(true);
  const switchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const designPackages = t.raw('design_packages') as PricingPkg[];
  const bimPackages = t.raw('bim_packages') as PricingPkg[];
  const packages = tab === 'design' ? designPackages : bimPackages;

  function switchTab(next: 'design' | 'bim') {
    if (next === tab) return;
    if (switchTimeout.current) clearTimeout(switchTimeout.current);
    setCardsVisible(false);
    switchTimeout.current = setTimeout(() => {
      setTab(next);
      setActiveIndex(1);
      setCardsVisible(true);
    }, 250);
  }

  function getPosition(i: number) {
    const diff = i - activeIndex;
    if (diff === 0) return 'active';
    if (diff === -1) return 'left';
    if (diff === 1) return 'right';
    return 'hidden';
  }

  return (
    <section id="pricing" className="snap-section flex flex-col justify-center">
      <Image
        src="/images/pricing-background.avif"
        alt=""
        fill
        className="object-cover"
      />
      <div className="relative w-full max-w-7xl mx-auto px-8 md:px-16">
        <AnimatedText>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-[clamp(0.75rem,2.5vh,2.5rem)] gap-4 md:gap-6">
            <div>
              <p className="text-gold text-xs font-bold mb-4 tracking-[5px]">
                PRICING
              </p>
              <h2
                className="font-bold leading-none text-(--text-primary)"
                style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
              >
                {t('title')}
              </h2>
              <div className="w-12 h-px bg-gold mt-4" />
            </div>
            <div className="flex overflow-hidden border border-[var(--border-subtle)]">
              {(['design', 'bim'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => switchTab(key)}
                  className={`px-8 py-3 text-xs font-bold uppercase cursor-pointer transition-all duration-200 tracking-[3px] ${
                    tab === key ? 'bg-gold text-black' : 'bg-transparent text-(--text-muted)'
                  }`}
                >
                  {t(key === 'design' ? 'design_tab' : 'bim_tab')}
                </button>
              ))}
            </div>
          </div>
        </AnimatedText>

        {/* 3D Carousel */}
        <div
          className="relative w-full h-[clamp(260px,42vh,420px)] transition-all duration-250"
          style={{perspective: '1200px', opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? 'translateY(0)' : 'translateY(12px)'}}
        >
          {packages.map((pkg, i) => {
            const pos = getPosition(i);
            const posStyle = get3DStyle(pos as 'active' | 'left' | 'right' | 'hidden');

            return (
              <div
                key={`${tab}-${i}`}
                onClick={() => setActiveIndex(i)}
                className="absolute top-1/2 left-1/2 cursor-pointer"
                style={{
                  width: 'min(360px, 85vw)',
                  ...posStyle,
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background: pos === 'active' ? 'var(--bg-card)' : 'var(--bg-card-alt)',
                    border: pos === 'active' ? '1px solid rgba(255,184,0,0.3)' : '1px solid var(--border)',
                  }}
                >
                  {/* Header gradient */}
                  <div className="p-[clamp(1rem,2vh,1.75rem)] px-8" style={{background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)'}}>
                    <p className="text-black/60 text-xs font-bold mb-1 tracking-[3px]">
                      {pkg.name}
                    </p>
                    <h3 className="text-black font-bold text-[clamp(1.1rem,2vh,1.5rem)]">
                      {pkg.label}
                    </h3>
                    <div className="mt-[clamp(0.5rem,1vh,1rem)]">
                      <span className="text-black font-bold text-[clamp(1.5rem,3vh,2.25rem)]">{pkg.price}</span>
                      <span className="text-black/60 text-base ml-2">{t('unit')}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-[clamp(0.75rem,1.5vh,1.5rem)] px-8">
                    <p className="font-bold mb-[clamp(0.5rem,1vh,1rem)] text-[0.75rem] tracking-[3px] text-[var(--text-subtle)]">
                      {t('includes').toUpperCase()}
                    </p>
                    <ul className="space-y-[clamp(0.35rem,0.8vh,0.75rem)]">
                      {pkg.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-base text-(--text-muted)">
                          <span className="text-gold flex-none mt-0.5">✓</span>
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
        <div
          className="flex justify-center gap-3 mt-[clamp(0.25rem,1vh,1rem)] transition-opacity duration-250"
          style={{opacity: cardsVisible ? 1 : 0}}
        >
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="cursor-pointer transition-all duration-200 rounded-full h-2"
              style={{
                width: i === activeIndex ? '24px' : '8px',
                background: i === activeIndex ? '#FFB800' : 'var(--text-faint)',
              }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>

        {/* BIM note — always rendered to reserve space, hidden on design tab */}
        <div className={`mt-[clamp(0.5rem,1.5vh,1.5rem)] max-w-xl mx-auto border border-gold/30 rounded-xl p-[clamp(0.75rem,1.5vh,1.25rem)] bg-gold/40 transition-opacity duration-300 ${tab === 'bim' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-3">
            {t('bim_note_title')}
          </p>
          <ul className="space-y-1.5">
            {(t.raw('bim_note_items') as string[]).map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-(--text-muted)">
                <span className="text-black flex-none mt-0.5">—</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
