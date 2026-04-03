'use client';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-bg.png"
        alt="BuildX Hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{duration: 0.8}}
          className="w-12 h-0.5 bg-[#FFB800] mx-auto mb-8 origin-left"
        />
        <motion.p
          initial={{opacity: 0, y: 30}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.9, delay: 0.3}}
          className="text-white text-lg md:text-xl lg:text-2xl leading-relaxed font-light max-w-3xl mx-auto mb-10"
        >
          {t('headline')}
        </motion.p>
        <motion.a
          href="#about"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.7, delay: 0.7}}
          className="inline-block border border-[#FFB800] text-[#FFB800] px-8 py-3 text-xs font-bold tracking-[3px] uppercase hover:bg-[#FFB800] hover:text-black transition-all duration-300"
        >
          {t('cta')}
        </motion.a>
      </div>

      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{delay: 1.2, duration: 0.8}}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#FFB800]" />
      </motion.div>
    </section>
  );
}
