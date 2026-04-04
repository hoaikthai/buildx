# Dark/Light Theme Toggle Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a dark/light toggle button to the Navbar that switches the whole site between the existing dark palette (#111/#0d0d0d) and a light palette (#fff/#f5f5f5) using CSS custom properties.

**Architecture:** CSS custom properties defined in `:root` (light defaults) are overridden by `html.dark` selectors. An anti-FOUC inline script in `<head>` applies `html.dark` before first paint (defaults to dark). A `ThemeToggle` client component toggles the class and persists the choice to `localStorage`.

**Tech Stack:** Next.js 16 App Router (static export), Tailwind v4, React 19, no test framework.

---

## File Map

| File                                          | Action | Purpose                                                            |
| --------------------------------------------- | ------ | ------------------------------------------------------------------ |
| `app/globals.css`                             | Modify | Add CSS variable tokens, update `body`, add `.sidenav-dot` classes |
| `app/layout.tsx`                              | Modify | Add anti-FOUC `<script>` in `<head>`                               |
| `components/layout/ThemeToggle.tsx`           | Create | Sun/moon toggle button                                             |
| `components/layout/Navbar.tsx`                | Modify | Add ThemeToggle, fix hardcoded colors                              |
| `components/layout/SideNav.tsx`               | Modify | Replace inline visual styles with CSS classes                      |
| `components/layout/MobileMenu.tsx`            | Modify | Replace hardcoded white with CSS vars                              |
| `components/ui/LanguageSwitcher.tsx`          | Modify | Replace hardcoded white with CSS vars                              |
| `components/sections/AboutSection.tsx`        | Modify | bg + text → CSS vars                                               |
| `components/sections/BimSection.tsx`          | Modify | bg + text + carousel button inline styles → CSS vars               |
| `components/sections/DesignSection.tsx`       | Modify | bg + accordion card bg → CSS vars                                  |
| `components/sections/ConstructionSection.tsx` | Modify | bg + text + gradient overlay → CSS vars                            |
| `components/sections/PricingSection.tsx`      | Modify | bg + text + card inline styles → CSS vars                          |
| `components/sections/NewsSection.tsx`         | Modify | hardcoded light colors → CSS vars                                  |
| `components/sections/ContactSection.tsx`      | Modify | hardcoded light colors → CSS vars                                  |
| `components/ui/NewsCard.tsx`                  | Modify | hardcoded light colors → CSS vars                                  |

---

## Task 1: CSS Variables + SideNav Dot Classes

**Files:**

- Modify: `app/globals.css`

- [ ] **Step 1: Add variable tokens and update `body`, add sidenav dot classes**

Replace the entire contents of `app/globals.css` with:

```css
@import 'tailwindcss';

@theme {
  --color-gold: #ffb800;
  --color-dark: #111111;
  --color-dark-2: #1a1a1a;
  --color-gray-muted: #888888;
  --font-archivo: 'Archivo', sans-serif;
}

/* ─── Light theme (default) ───────────────────────── */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --bg-card: #ffffff;
  --bg-card-alt: #e8e8e8;
  --bg-nav: rgba(255, 255, 255, 0.95);

  --text-primary: #111111;
  --text-muted: rgba(0, 0, 0, 0.6);
  --text-subtle: rgba(0, 0, 0, 0.4);
  --text-faint: rgba(0, 0, 0, 0.2);

  --border: rgba(0, 0, 0, 0.08);
  --border-subtle: rgba(0, 0, 0, 0.15);

  --logo-filter: brightness(0);

  --dot-bg: rgba(0, 0, 0, 0.06);
  --dot-border: rgba(0, 0, 0, 0.15);
  --dot-text: rgba(0, 0, 0, 0.5);
}

/* ─── Dark theme ────────────────────────────────────── */
html.dark {
  --bg-primary: #111111;
  --bg-secondary: #0d0d0d;
  --bg-card: #1a1a1a;
  --bg-card-alt: #141414;
  --bg-nav: rgba(17, 17, 17, 0.95);

  --text-primary: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.6);
  --text-subtle: rgba(255, 255, 255, 0.3);
  --text-faint: rgba(255, 255, 255, 0.2);

  --border: rgba(255, 255, 255, 0.1);
  --border-subtle: rgba(255, 255, 255, 0.15);

  --logo-filter: brightness(0) invert(1);

  --dot-bg: rgba(255, 255, 255, 0.12);
  --dot-border: rgba(255, 255, 255, 0.18);
  --dot-text: rgba(255, 255, 255, 0.75);
}

@layer base {
  html {
    color-scheme: light;
    height: 100dvh;
    overflow: hidden;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-archivo);
    overflow: hidden;
    height: 100dvh;
    transition:
      background-color 0.25s ease,
      color 0.25s ease;
  }

  * {
    box-sizing: border-box;
  }
}

@layer components {
  /* Scroll snap container */
  .snap-container {
    height: 100dvh;
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
  }

  /* Every snapping section */
  .snap-section {
    height: 100dvh;
    scroll-snap-align: start;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
  }

  /* SideNav dots */
  .sidenav-dot {
    background: var(--dot-bg);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid var(--dot-border);
    color: var(--dot-text);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  }

  .sidenav-dot--active {
    background: rgba(255, 184, 0, 0.95);
    border: 1px solid rgba(255, 184, 0, 0.5);
    color: #111111;
    box-shadow: 0 8px 28px rgba(255, 184, 0, 0.35);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add CSS variable token system for dark/light theme"
```

---

## Task 2: Anti-FOUC Script

**Files:**

- Modify: `app/layout.tsx`

- [ ] **Step 1: Add `<head>` with inline script**

Replace `app/layout.tsx` with:

```tsx
import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { Archivo } from 'next/font/google'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-archivo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'BuildX — Giải pháp BIM & Thiết kế',
  description:
    'Công ty Cổ phần Đầu tư BuildX — Giải pháp BIM, Thiết kế và Thi công chuyên nghiệp tại Đà Nẵng.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning className={archivo.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add anti-FOUC theme script to layout head"
```

---

## Task 3: ThemeToggle Component

**Files:**

- Create: `components/layout/ThemeToggle.tsx`

- [ ] **Step 1: Create the component**

```tsx
'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !isDark
    setIsDark(next)
    if (next) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex cursor-pointer items-center justify-center transition-colors duration-200"
      style={{
        width: '32px',
        height: '32px',
        color: 'var(--text-muted)',
      }}
    >
      {isDark ? (
        /* Sun icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        /* Moon icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/ThemeToggle.tsx
git commit -m "feat: add ThemeToggle component"
```

---

## Task 4: Navbar

**Files:**

- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Replace Navbar.tsx**

```tsx
'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'
import MobileMenu from './MobileMenu'
import ThemeToggle from './ThemeToggle'

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

export default function Navbar() {
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
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 backdrop-blur-sm' : 'bg-transparent py-5'
        }`}
        style={scrolled ? { background: 'var(--bg-nav)' } : undefined}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <button
            className="flex-none cursor-pointer"
            onClick={() => scrollToSection(0)}
          >
            <Image
              src="/images/logo.avif"
              alt="BuildX"
              width={120}
              height={45}
              className="object-contain"
              style={{ filter: 'var(--logo-filter)' }}
            />
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {navItems.map(({ label, onClick }) => (
              <button
                key={label}
                onClick={onClick}
                className="hover:text-gold cursor-pointer border-none bg-transparent text-xs font-bold tracking-widest uppercase transition-colors"
                style={{ color: 'var(--text-muted)' }}
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
              <span
                className="block h-0.5 w-6"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <span
                className="block h-0.5 w-6"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
              <span
                className="block h-0.5 w-4"
                style={{ backgroundColor: 'var(--text-primary)' }}
              />
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
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add ThemeToggle to Navbar, fix hardcoded colors"
```

---

## Task 5: SideNav

**Files:**

- Modify: `components/layout/SideNav.tsx`

- [ ] **Step 1: Replace SideNav.tsx**

```tsx
'use client'
import { useState, useEffect, useRef } from 'react'

const SECTIONS = [
  { id: 'home', num: '1' },
  { id: 'about', num: '2' },
  { id: 'bim', num: '3' },
  { id: 'design', num: '4' },
  { id: 'construction', num: '5' },
  { id: 'pricing', num: '6' },
  { id: 'news', num: '7' },
  { id: 'contact', num: '8' },
]

export default function SideNav() {
  const [active, setActive] = useState<string>('home')
  const containerRef = useRef<Element | null>(null)

  useEffect(() => {
    containerRef.current = document.querySelector('.snap-container')
    const container = containerRef.current
    if (!container) return

    function onScroll() {
      const dvh = window.innerHeight
      const scrollTop = container!.scrollTop
      const index = Math.round(scrollTop / dvh)
      const section = SECTIONS[Math.min(index, SECTIONS.length - 1)]
      if (section) setActive(section.id)
    }

    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    const container = containerRef.current
    if (!container) return
    const idx = SECTIONS.findIndex((s) => s.id === id)
    container.scrollTo({ top: idx * window.innerHeight, behavior: 'smooth' })
  }

  return (
    <nav className="fixed top-1/2 right-4 z-40 hidden -translate-y-1/2 flex-col items-center gap-2.5 xl:flex">
      {SECTIONS.map(({ id, num }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to section ${num}`}
            className={`sidenav-dot ${isActive ? 'sidenav-dot--active' : ''} flex cursor-pointer items-center justify-center rounded-full text-xs font-bold transition-all duration-200`}
            style={{
              width: '36px',
              height: '36px',
              transform: isActive ? 'scale(1.12)' : 'scale(1)',
            }}
          >
            {num}
          </button>
        )
      })}
    </nav>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/SideNav.tsx
git commit -m "feat: migrate SideNav dots to CSS variable classes"
```

---

## Task 6: MobileMenu + LanguageSwitcher

**Files:**

- Modify: `components/layout/MobileMenu.tsx`
- Modify: `components/ui/LanguageSwitcher.tsx`

- [ ] **Step 1: Replace MobileMenu.tsx**

```tsx
'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSwitcher from '@/components/ui/LanguageSwitcher'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  navItems: { label: string; onClick: () => void }[]
}

export default function MobileMenu({
  open,
  onClose,
  navItems,
}: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: 'var(--bg-primary)' }}
        >
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="hover:text-gold cursor-pointer text-4xl leading-none transition-colors"
              style={{ color: 'var(--text-muted)' }}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navItems.map(({ label, onClick }, i) => (
              <motion.button
                key={label}
                onClick={() => {
                  onClick()
                  onClose()
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="hover:text-gold cursor-pointer border-none bg-transparent text-2xl font-bold tracking-widest uppercase transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                {label}
              </motion.button>
            ))}
          </nav>

          <div className="flex justify-center pb-10">
            <LanguageSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

- [ ] **Step 2: Replace LanguageSwitcher.tsx**

```tsx
'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="flex items-center gap-1 text-xs font-bold tracking-widest">
      <button
        onClick={() => switchLocale('vi')}
        className="cursor-pointer px-2 py-1 transition-colors"
        style={{ color: locale === 'vi' ? '#FFB800' : 'var(--text-subtle)' }}
      >
        VI
      </button>
      <span style={{ color: 'var(--text-faint)' }}>|</span>
      <button
        onClick={() => switchLocale('en')}
        className="cursor-pointer px-2 py-1 transition-colors"
        style={{ color: locale === 'en' ? '#FFB800' : 'var(--text-subtle)' }}
      >
        EN
      </button>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/MobileMenu.tsx components/ui/LanguageSwitcher.tsx
git commit -m "feat: fix MobileMenu and LanguageSwitcher hardcoded colors"
```

---

## Task 7: AboutSection + ConstructionSection

**Files:**

- Modify: `components/sections/AboutSection.tsx`
- Modify: `components/sections/ConstructionSection.tsx`

- [ ] **Step 1: Replace AboutSection.tsx**

```tsx
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

export default function AboutSection() {
  const t = useTranslations('about')

  return (
    <section
      id="about"
      className="snap-section flex items-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
          <AnimatedText>
            <p
              className="text-gold mb-4 text-xs font-bold"
              style={{ letterSpacing: '5px' }}
            >
              BUILDX
            </p>
            <h2
              className="mb-10 leading-none font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                color: 'var(--text-primary)',
              }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-10 h-px w-12" />
            <div className="space-y-8">
              <div>
                <p
                  className="text-gold mb-3 text-xs font-bold"
                  style={{ letterSpacing: '4px' }}
                >
                  {t('vision_label').toUpperCase()}
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: '1rem', color: 'var(--text-muted)' }}
                >
                  {t('vision')}
                </p>
              </div>
              <div>
                <p
                  className="text-gold mb-3 text-xs font-bold"
                  style={{ letterSpacing: '4px' }}
                >
                  {t('mission_label').toUpperCase()}
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: '1rem', color: 'var(--text-muted)' }}
                >
                  {t('mission')}
                </p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div
              className="relative"
              style={{
                aspectRatio: '1/1',
                maxWidth: '520px',
                margin: '0 auto',
              }}
            >
              <Image
                src="/images/about.avif"
                alt="About BuildX"
                fill
                className="object-cover"
              />
              <div
                className="absolute -bottom-5 -left-5 h-28 w-28"
                style={{
                  borderLeft: '2px solid #FFB800',
                  borderBottom: '2px solid #FFB800',
                }}
              />
              <div
                className="absolute -top-5 -right-5 h-28 w-28"
                style={{
                  borderRight: '2px solid #FFB800',
                  borderTop: '2px solid #FFB800',
                }}
              />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace ConstructionSection.tsx**

```tsx
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

export default function ConstructionSection() {
  const t = useTranslations('construction')

  return (
    <section
      id="construction"
      className="snap-section flex items-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="w-full">
        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ minHeight: '100vh' }}
        >
          {/* Image fills left half */}
          <AnimatedText delay={0.1} className="relative">
            <div
              className="relative h-full w-full"
              style={{ minHeight: '50vh' }}
            >
              <Image
                src="/images/bim-5.avif"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, transparent 70%, var(--bg-primary) 100%)',
                }}
              />
            </div>
          </AnimatedText>

          {/* Text right half */}
          <AnimatedText className="flex flex-col justify-center px-12 py-20 lg:px-16">
            <p
              className="text-gold mb-4 text-xs font-bold"
              style={{ letterSpacing: '5px' }}
            >
              CONSTRUCTION
            </p>
            <h2
              className="mb-6 leading-none font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                color: 'var(--text-primary)',
              }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-8 h-px w-12" />
            <p
              className="leading-relaxed"
              style={{
                fontSize: '1.05rem',
                maxWidth: '480px',
                color: 'var(--text-muted)',
              }}
            >
              {t('description')}
            </p>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/AboutSection.tsx components/sections/ConstructionSection.tsx
git commit -m "feat: migrate AboutSection and ConstructionSection to CSS vars"
```

---

## Task 8: BimSection

**Files:**

- Modify: `components/sections/BimSection.tsx`

- [ ] **Step 1: Replace BimSection.tsx**

```tsx
'use client'
import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

const BIM_IMAGES = [
  'bim-1.avif',
  'bim-2.avif',
  'bim-3.avif',
  'bim-4.avif',
  'bim-5.avif',
  'bim-6.avif',
  'bim-7.avif',
  'bim-8.avif',
  'bim-9.avif',
  'bim-10.avif',
]

export default function BimSection() {
  const t = useTranslations('bim')
  const features = t.raw('features') as string[]
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true })

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <section
      id="bim"
      className="snap-section flex items-center"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <AnimatedText>
            <p
              className="text-gold mb-4 text-xs font-bold"
              style={{ letterSpacing: '5px' }}
            >
              BIM SOLUTIONS
            </p>
            <h2
              className="mb-6 leading-none font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                color: 'var(--text-primary)',
              }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-8 h-px w-12" />
            <p
              className="text-gold mb-4 font-semibold"
              style={{ fontSize: '1.05rem' }}
            >
              {t('subtitle')}
            </p>
            <p
              className="mb-10 leading-relaxed"
              style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}
            >
              {t('description')}
            </p>
            <ul className="space-y-4">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-4"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span
                    className="text-gold flex-none font-bold"
                    style={{ fontSize: '1.1rem' }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="h-px w-6 flex-none"
                    style={{ background: 'rgba(255,184,0,0.4)' }}
                  />
                  <span style={{ fontSize: '0.95rem' }}>{feature}</span>
                </li>
              ))}
            </ul>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <div>
              <div
                className="overflow-hidden"
                ref={emblaRef}
                style={{ borderRadius: '2px' }}
              >
                <div className="flex">
                  {BIM_IMAGES.map((img, i) => (
                    <div
                      key={i}
                      className="relative w-full flex-none"
                      style={{ aspectRatio: '16/9' }}
                    >
                      <Image
                        src={`/images/${img}`}
                        alt={`BIM project ${i + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ letterSpacing: '3px', color: 'var(--text-subtle)' }}
                >
                  DRAG TO EXPLORE
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="hover:bg-gold flex cursor-pointer items-center justify-center transition-all duration-200 hover:text-black"
                    style={{
                      width: '44px',
                      height: '44px',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                      fontSize: '18px',
                    }}
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="hover:bg-gold flex cursor-pointer items-center justify-center transition-all duration-200 hover:text-black"
                    style={{
                      width: '44px',
                      height: '44px',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-muted)',
                      fontSize: '18px',
                    }}
                    aria-label="Next"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/BimSection.tsx
git commit -m "feat: migrate BimSection to CSS vars"
```

---

## Task 9: DesignSection

**Files:**

- Modify: `components/sections/DesignSection.tsx`

- [ ] **Step 1: Replace DesignSection.tsx**

```tsx
'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

const CARD_NUMS = ['01', '02', '03', '04']
const CARD_BG = [
  'var(--bg-secondary)',
  'var(--bg-card)',
  'var(--bg-primary)',
  'var(--bg-secondary)',
]

export default function DesignSection() {
  const t = useTranslations('design')
  const services = t.raw('services') as { name: string; description: string }[]
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section
      id="design"
      className="snap-section flex flex-col justify-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-8 pt-20 pb-8 md:px-16">
        <AnimatedText>
          <p
            className="text-gold mb-4 text-xs font-bold"
            style={{ letterSpacing: '5px' }}
          >
            SERVICES
          </p>
          <h2
            className="mb-3 leading-none font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
              color: 'var(--text-primary)',
            }}
          >
            {t('title')}
          </h2>
          <div className="bg-gold mb-3 h-px w-12" />
          <p
            className="mb-8"
            style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}
          >
            {t('description')}
          </p>
        </AnimatedText>
      </div>

      {/* Hover-expanding accordion cards */}
      <div
        className="flex w-full"
        style={{
          height: 'calc(100vh - 280px)',
          minHeight: '320px',
          maxHeight: '520px',
        }}
      >
        {services.map((service, i) => {
          const isHovered = hovered === i
          const anyHovered = hovered !== null

          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="relative cursor-default overflow-hidden"
              style={{
                flex: isHovered ? '4 1 0%' : anyHovered ? '0.5 1 0%' : '1 1 0%',
                transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)',
                background: CARD_BG[i],
                borderRight:
                  i < services.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Large number watermark */}
              <div
                className="absolute inset-0 flex items-end justify-start"
                style={{ padding: '20px 24px' }}
              >
                <span
                  className="leading-none font-bold select-none"
                  style={{
                    fontSize: 'clamp(5rem, 12vw, 10rem)',
                    color: 'var(--border)',
                  }}
                >
                  {CARD_NUMS[i]}
                </span>
              </div>

              {/* Gold left border on hover */}
              <div
                className="absolute top-0 bottom-0 left-0 transition-all duration-500"
                style={{
                  width: '3px',
                  background: '#FFB800',
                  transform: isHovered ? 'scaleY(1)' : 'scaleY(0)',
                  transformOrigin: 'bottom',
                }}
              />

              {/* Number label at top */}
              <div className="absolute top-8 left-6">
                <span
                  className="text-gold font-bold"
                  style={{ fontSize: '0.7rem', letterSpacing: '3px' }}
                >
                  {CARD_NUMS[i]}
                </span>
              </div>

              {/* Content revealed on hover */}
              <div
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  padding: '40px 36px',
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? 'translateX(0)' : 'translateX(-16px)',
                  transition: 'opacity 0.4s ease, transform 0.4s ease',
                  transitionDelay: isHovered ? '0.1s' : '0s',
                  minWidth: '280px',
                }}
              >
                <div className="bg-gold mb-6 h-px w-8" />
                <h3
                  className="mb-4 leading-tight font-bold"
                  style={{
                    fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                    whiteSpace: 'nowrap',
                    color: 'var(--text-primary)',
                  }}
                >
                  {service.name}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{
                    fontSize: '0.9rem',
                    maxWidth: '320px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/DesignSection.tsx
git commit -m "feat: migrate DesignSection accordion to CSS vars"
```

---

## Task 10: PricingSection

**Files:**

- Modify: `components/sections/PricingSection.tsx`

- [ ] **Step 1: Replace PricingSection.tsx**

```tsx
'use client'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

interface PricingPkg {
  name: string
  label: string
  price: string
  items: string[]
}

function get3DStyle(position: 'active' | 'left' | 'right' | 'hidden') {
  const base = 'absolute top-1/2 left-1/2 transition-all duration-500'
  switch (position) {
    case 'active':
      return {
        className: base,
        style: {
          transform: 'translate(-50%, -50%) scale(1.05)',
          opacity: 1,
          zIndex: 10,
        },
      }
    case 'left':
      return {
        className: base,
        style: {
          transform:
            'translate(calc(-50% - 300px), -50%) scale(0.85) perspective(800px) rotateY(15deg)',
          opacity: 0.65,
          zIndex: 5,
        },
      }
    case 'right':
      return {
        className: base,
        style: {
          transform:
            'translate(calc(-50% + 300px), -50%) scale(0.85) perspective(800px) rotateY(-15deg)',
          opacity: 0.65,
          zIndex: 5,
        },
      }
    default:
      return {
        className: base,
        style: {
          transform: 'translate(-50%, -50%) scale(0.7)',
          opacity: 0,
          zIndex: 0,
        },
      }
  }
}

export default function PricingSection() {
  const t = useTranslations('pricing')
  const [tab, setTab] = useState<'design' | 'bim'>('design')
  const [activeIndex, setActiveIndex] = useState(1)

  const designPackages = t.raw('design_packages') as PricingPkg[]
  const bimPackages = t.raw('bim_packages') as PricingPkg[]
  const packages = tab === 'design' ? designPackages : bimPackages

  function getPosition(i: number) {
    const diff = i - activeIndex
    if (diff === 0) return 'active'
    if (diff === -1) return 'left'
    if (diff === 1) return 'right'
    return 'hidden'
  }

  return (
    <section
      id="pricing"
      className="snap-section flex flex-col justify-center"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-8 md:px-16">
        <AnimatedText>
          <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p
                className="text-gold mb-4 text-xs font-bold"
                style={{ letterSpacing: '5px' }}
              >
                PRICING
              </p>
              <h2
                className="leading-none font-bold"
                style={{
                  fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                  color: 'var(--text-primary)',
                }}
              >
                {t('title')}
              </h2>
              <div className="bg-gold mt-4 h-px w-12" />
            </div>
            <div
              className="flex overflow-hidden"
              style={{ border: '1px solid var(--border-subtle)' }}
            >
              {(['design', 'bim'] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setTab(key)
                    setActiveIndex(1)
                  }}
                  className="cursor-pointer px-8 py-3 text-xs font-bold uppercase transition-all duration-200"
                  style={{
                    letterSpacing: '3px',
                    background: tab === key ? '#FFB800' : 'transparent',
                    color: tab === key ? '#111' : 'var(--text-muted)',
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
          style={{ height: '420px', perspective: '1200px' }}
        >
          {packages.map((pkg, i) => {
            const pos = getPosition(i)
            const { style } = get3DStyle(
              pos as 'active' | 'left' | 'right' | 'hidden',
            )

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
                <div
                  style={{
                    background:
                      pos === 'active'
                        ? 'var(--bg-card)'
                        : 'var(--bg-card-alt)',
                    border:
                      pos === 'active'
                        ? '1px solid rgba(255,184,0,0.3)'
                        : '1px solid var(--border)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Header gradient */}
                  <div
                    style={{
                      background:
                        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
                      padding: '28px 32px',
                    }}
                  >
                    <p
                      className="mb-1 text-xs font-bold text-black/60"
                      style={{ letterSpacing: '3px' }}
                    >
                      {pkg.name}
                    </p>
                    <h3
                      className="font-bold text-black"
                      style={{ fontSize: '1.3rem' }}
                    >
                      {pkg.label}
                    </h3>
                    <div className="mt-4">
                      <span
                        className="font-bold text-black"
                        style={{ fontSize: '2rem' }}
                      >
                        {pkg.price}
                      </span>
                      <span className="ml-2 text-sm text-black/60">
                        {t('unit')}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div style={{ padding: '24px 32px' }}>
                    <p
                      className="mb-4 font-bold"
                      style={{
                        fontSize: '0.7rem',
                        letterSpacing: '3px',
                        color: 'var(--text-subtle)',
                      }}
                    >
                      {t('includes').toUpperCase()}
                    </p>
                    <ul className="space-y-3">
                      {pkg.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3"
                          style={{
                            fontSize: '0.875rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <span className="text-gold mt-0.5 flex-none">✓</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Carousel nav dots */}
        <div className="mt-4 flex justify-center gap-3">
          {packages.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className="cursor-pointer rounded-full transition-all duration-200"
              style={{
                width: i === activeIndex ? '24px' : '8px',
                height: '8px',
                background: i === activeIndex ? '#FFB800' : 'var(--text-faint)',
              }}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/PricingSection.tsx
git commit -m "feat: migrate PricingSection to CSS vars"
```

---

## Task 11: NewsSection, ContactSection, NewsCard

**Files:**

- Modify: `components/sections/NewsSection.tsx`
- Modify: `components/sections/ContactSection.tsx`
- Modify: `components/ui/NewsCard.tsx`

- [ ] **Step 1: Replace NewsSection.tsx**

```tsx
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'
import NewsCard from '@/components/ui/NewsCard'

export default function NewsSection() {
  const t = useTranslations('news')
  const articles = t.raw('articles') as {
    title: string
    excerpt: string
    image: string
  }[]

  return (
    <section
      id="news"
      className="snap-section flex items-center"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <AnimatedText>
          <p
            className="text-gold mb-4 text-xs font-bold"
            style={{ letterSpacing: '5px' }}
          >
            NEWS
          </p>
          <h2
            className="mb-4 leading-none font-bold"
            style={{
              fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
              color: 'var(--text-primary)',
            }}
          >
            {t('title')}
          </h2>
          <div className="bg-gold mb-12 h-px w-12" />
        </AnimatedText>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, i) => (
            <NewsCard
              key={i}
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              readMore={t('read_more')}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Replace NewsCard.tsx**

```tsx
'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface NewsCardProps {
  title: string
  excerpt: string
  image: string
  readMore: string
  index: number
}

export default function NewsCard({
  title,
  excerpt,
  image,
  readMore,
  index,
}: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-default overflow-hidden"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={`/images/${image}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3
          className="mb-3 line-clamp-2 text-base leading-snug font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="mb-4 line-clamp-3 text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {excerpt}
        </p>
        <span className="text-gold text-xs font-bold tracking-wider uppercase transition-colors hover:text-[#111]">
          {readMore} →
        </span>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 3: Replace ContactSection.tsx**

```tsx
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'

export default function ContactSection() {
  const t = useTranslations('contact')

  return (
    <section
      id="contact"
      className="snap-section flex items-center"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-2">
          <AnimatedText>
            <p
              className="text-gold mb-4 text-xs font-bold"
              style={{ letterSpacing: '5px' }}
            >
              CONTACT
            </p>
            <h2
              className="mb-4 leading-none font-bold"
              style={{
                fontSize: 'clamp(2.5rem, 4.5vw, 4rem)',
                color: 'var(--text-primary)',
              }}
            >
              {t('title')}
            </h2>
            <div className="bg-gold mb-10 h-px w-12" />

            <div className="space-y-8">
              <div>
                <p
                  className="text-gold mb-2 text-xs font-bold"
                  style={{ letterSpacing: '4px' }}
                >
                  {t('company').toUpperCase()}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>{t('address')}</p>
              </div>
              <div>
                <p
                  className="mb-3 text-xs uppercase"
                  style={{ letterSpacing: '3px', color: 'var(--text-subtle)' }}
                >
                  {t('hotline_label')}
                </p>
                <a
                  href={`tel:${t('hotline').replace(/\s/g, '')}`}
                  className="text-gold font-bold transition-colors"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}
                >
                  {t('hotline')}
                </a>
              </div>
              <div>
                <p
                  className="mb-3 text-xs uppercase"
                  style={{ letterSpacing: '3px', color: 'var(--text-subtle)' }}
                >
                  {t('tax_label')}
                </p>
                <p style={{ color: 'var(--text-muted)' }}>{t('tax')}</p>
              </div>
              <div>
                <p
                  className="mb-4 text-xs uppercase"
                  style={{ letterSpacing: '3px', color: 'var(--text-subtle)' }}
                >
                  {t('follow')}
                </p>
                <div className="flex gap-6">
                  {[
                    { label: 'Facebook', href: 'https://facebook.com' },
                    { label: 'YouTube', href: 'https://youtube.com' },
                    { label: 'TikTok', href: 'https://tiktok.com/@buildxvn' },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gold font-bold transition-colors"
                      style={{
                        fontSize: '0.8rem',
                        letterSpacing: '3px',
                        color: 'var(--text-subtle)',
                      }}
                    >
                      {label.toUpperCase()}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div
              className="w-full overflow-hidden"
              style={{ height: '480px', filter: 'grayscale(30%)' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.8559373694!2d108.19840491536485!3d16.02435288886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142190c3a692f33%3A0x79671c6d3a55c0b1!2zxJDGsOG7nW5nIFh1w6JuIFRodeG7p3ksIEPhuqltIEzhu4csIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2svn!4v1617000000000"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BuildX location"
              />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add components/sections/NewsSection.tsx components/sections/ContactSection.tsx components/ui/NewsCard.tsx
git commit -m "feat: migrate News, Contact sections and NewsCard to CSS vars"
```

---

## Task 12: Final verification commit

- [ ] **Step 1: Verify no hardcoded dark/light colors remain in sections**

```bash
grep -rn "bg-\[#111\]\|bg-\[#0d0d0d\]\|bg-\[#1a1a1a\]\|bg-white\b\|bg-\[#f5f5f5\]\|text-white\b" \
  components/sections/ components/layout/ components/ui/ \
  --include="*.tsx"
```

Expected: only `text-white` usages inside the gold-gradient pricing card header (which is intentional — the card header has a warm gradient bg where white text is correct), and `hover:text-white` patterns (hover states, intentional).

- [ ] **Step 2: Check for any remaining `rgba(255,255,255` inline styles in sections**

```bash
grep -rn "rgba(255,255,255" components/sections/ components/layout/ components/ui/ --include="*.tsx"
```

Expected: only usages inside `PricingSection` card border `rgba(255,184,0,0.3)` (gold, intentional) — fix any others by replacing with `var(--border)` or `var(--text-muted)`.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete dark/light theme toggle implementation"
```
