'use client';
import Image from 'next/image';
import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="snap-section relative w-full flex items-center justify-center overflow-hidden" style={{height: '100svh'}}>
      <Image
        src="/images/hero-bg.png"
        alt="BuildX Hero"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0" style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.65) 60%, rgba(0,0,0,0.8) 100%)'}} />

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center">
        <motion.div
          initial={{scaleX: 0}}
          animate={{scaleX: 1}}
          transition={{duration: 1, ease: 'easeOut'}}
          className="w-16 h-px bg-[#FFB800] mx-auto mb-10 origin-left"
        />
        <motion.p
          initial={{opacity: 0, y: 40}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 1, delay: 0.4, ease: 'easeOut'}}
          className="text-white leading-relaxed font-light mx-auto mb-12"
          style={{
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            maxWidth: '820px',
            letterSpacing: '0.02em',
          }}
        >
          {t('headline')}
        </motion.p>
        <motion.a
          href="#about"
          initial={{opacity: 0, y: 20}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.8, delay: 0.9}}
          className="inline-block text-[#FFB800] px-10 py-4 text-xs font-bold uppercase transition-all duration-300 hover:bg-[#FFB800] hover:text-black"
          style={{
            border: '1px solid #FFB800',
            letterSpacing: '4px',
          }}
        >
          {t('cta')}
        </motion.a>
      </div>

      <motion.div
        initial={{opacity: 0, y: 10}}
        animate={{opacity: 1, y: 0}}
        transition={{delay: 1.5, duration: 1, repeat: Infinity, repeatType: 'reverse'}}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-[4px] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-[#FFB800]" />
      </motion.div>
    </section>
  );
}
