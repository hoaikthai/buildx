import {setRequestLocale} from 'next-intl/server';
import Navbar from '@/components/layout/Navbar';
import SideNav from '@/components/layout/SideNav';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BimSection from '@/components/sections/BimSection';
import DesignSection from '@/components/sections/DesignSection';
import ConstructionSection from '@/components/sections/ConstructionSection';
import PricingSection from '@/components/sections/PricingSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';

type Props = {params: Promise<{locale: string}>};

export default async function HomePage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Fixed elements that sit above the scroll container */}
      <Navbar />
      <SideNav />

      {/* Snap container — the actual scroll surface */}
      <div className="snap-container">
        <HeroSection />
        <AboutSection />
        <BimSection />
        <DesignSection />
        <ConstructionSection />
        <PricingSection />
        <NewsSection />
        <ContactSection />
      </div>
    </>
  );
}
