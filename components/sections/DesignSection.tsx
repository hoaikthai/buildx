import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';
import ServiceCard from '@/components/ui/ServiceCard';

export default function DesignSection() {
  const t = useTranslations('design');
  const services = t.raw('services') as {name: string; description: string}[];

  return (
    <section id="design" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText>
          <div className="max-w-2xl mb-16">
            <SectionTitle title={t('title')} />
            <p className="text-white/60 leading-relaxed">{t('description')}</p>
          </div>
        </AnimatedText>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={i}
              name={service.name}
              description={service.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
