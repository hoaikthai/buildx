'use client'
import { useState, useEffect } from 'react'
import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { MobileMenu } from './MobileMenu'
import { ThemeToggle } from './ThemeToggle'

const NAV_SECTIONS = [
  { key: 'about', idx: 1 },
  { key: 'bim', idx: 2 },
  { key: 'design', idx: 3 },
  { key: 'construction', idx: 4 },
  { key: 'pricing', idx: 5 },
  { key: 'news', idx: 6 },
  { key: 'contact', idx: 7 },
] as const

function scrollToSection(idx: number) {
  const container = document.querySelector('.snap-container')
  if (!container) return
  container.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })
}

export function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const container = document.querySelector('.snap-container')
    if (!container) return
    const onScroll = () =>
      setScrolled(container.scrollTop > window.innerHeight * 0.5)
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = NAV_SECTIONS.map(({ key, idx }) => ({
    label: t(key),
    onClick: () => scrollToSection(idx),
  }))

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 bg-linear-to-b from-black/20 to-transparent transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <button
            className="flex-none cursor-pointer"
            onClick={() => scrollToSection(0)}
          >
            <Image
              src="/images/logo.avif"
              alt="BuildX"
              width={144}
              height={54}
              className="object-contain"
            />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map(({ label, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="hover:text-gold cursor-pointer border-none bg-transparent text-xs font-bold tracking-widest text-(--text-muted) uppercase transition-colors"
              >
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
            <button
              className="flex cursor-pointer flex-col gap-1.5 p-2 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block h-0.5 w-6 bg-(--text-primary)" />
              <span className="block h-0.5 w-6 bg-(--text-primary)" />
              <span className="block h-0.5 w-4 bg-(--text-primary)" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        navItems={navItems.map(({ label, onClick }) => ({ label, onClick }))}
      />
    </>
  )
}
