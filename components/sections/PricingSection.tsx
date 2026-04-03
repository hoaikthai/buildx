'use client';
import {useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';
import PricingCard from '@/components/ui/PricingCard';

export default function PricingSection() {
  const t = useTranslations('pricing');
  const [tab, setTab] = useState<'design' | 'bim'>('design');
  const [emblaRef] = useEmblaCarousel({dragFree: true, align: 'start'});

  const designPackages = t.raw('design_packages') as {
    name: string; label: string; price: string; items: string[];
  }[];
  const bimPackages = t.raw('bim_packages') as {
    name: string; label: string; price: string; items: string[];
  }[];

  const packages = tab === 'design' ? designPackages : bimPackages;

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <SectionTitle title={t('title')} />
              <p className="text-white/50">{t('subtitle')}</p>
            </div>
            <div className="flex border border-white/20 overflow-hidden w-fit">
              <button
                onClick={() => setTab('design')}
                className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  tab === 'design' ? 'bg-[#FFB800] text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {t('design_tab')}
              </button>
              <button
                onClick={() => setTab('bim')}
                className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  tab === 'bim' ? 'bg-[#FFB800] text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {t('bim_tab')}
              </button>
            </div>
          </div>
        </AnimatedText>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6">
            {packages.map((pkg, i) => (
              <PricingCard
                key={`${tab}-${i}`}
                pkg={pkg}
                unit={t('unit')}
                includes={t('includes')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
