'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {LanguageSwitcher} from '@/components/ui/LanguageSwitcher';
import {MobileMenu} from './MobileMenu';
import {ThemeToggle} from './ThemeToggle';

const NAV_SECTIONS = [
  {key: 'about', idx: 1},
  {key: 'bim', idx: 2},
  {key: 'design', idx: 3},
  {key: 'construction', idx: 4},
  {key: 'pricing', idx: 5},
  {key: 'news', idx: 6},
  {key: 'contact', idx: 7},
] as const;

function scrollToSection(idx: number) {
  const container = document.querySelector('.snap-container');
  if (!container) return;
  container.scrollTo({top: idx * window.innerHeight, behavior: 'smooth'});
}

export function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const container = document.querySelector('.snap-container');
    if (!container) return;
    const onScroll = () => setScrolled(container.scrollTop > window.innerHeight * 0.5);
    container.addEventListener('scroll', onScroll, {passive: true});
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = NAV_SECTIONS.map(({key, idx}) => ({
    label: t(key),
    onClick: () => scrollToSection(idx),
  }));

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-sm py-3 bg-[var(--bg-nav)]' : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <button className="flex-none cursor-pointer" onClick={() => scrollToSection(0)}>
            <Image
              src="/images/logo.avif"
              alt="BuildX"
              width={120}
              height={45}
              className="object-contain"
              style={{filter: 'var(--logo-filter)'}}
            />
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map(({label, onClick}) => (
              <button
                key={label}
                onClick={onClick}
                className="text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer bg-transparent border-none hover:text-gold text-[var(--text-muted)]"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-6 h-0.5 bg-[var(--text-primary)]" />
              <span className="block w-6 h-0.5 bg-[var(--text-primary)]" />
              <span className="block w-4 h-0.5 bg-[var(--text-primary)]" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems.map(({label, onClick}) => ({label, onClick}))}
      />
    </>
  );
}
