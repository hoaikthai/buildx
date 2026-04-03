'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from './MobileMenu';

const NAV_KEYS = ['about', 'bim', 'design', 'construction', 'pricing', 'news', 'contact'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = NAV_KEYS.map((key) => ({label: t(key), href: `#${key}`}));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#111]/95 backdrop-blur-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex-none">
            <Image
              src="/images/logo.png"
              alt="BuildX"
              width={120}
              height={45}
              className="object-contain"
              style={{filter: 'brightness(0) invert(1)'}}
            />
          </a>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({label, href}) => (
              <a
                key={href}
                href={href}
                className="text-white/70 hover:text-[#FFB800] text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-6 h-0.5 bg-white" />
              <span className="block w-4 h-0.5 bg-white" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems}
      />
    </>
  );
}
