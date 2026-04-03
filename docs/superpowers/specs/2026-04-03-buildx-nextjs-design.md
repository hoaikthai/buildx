---
title: BuildX Next.js Rebuild
date: 2026-04-03
status: approved
---

# BuildX Next.js Rebuild — Design Spec

## Overview

A faithful Next.js 16 rebuild of [buildx.vn](https://buildx.vn) — a Vietnamese construction/BIM company website. Same content, same images, same visual style. Static output with Vietnamese/English i18n support.

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| i18n | next-intl, `/vi` and `/en` locale prefixes, Vietnamese default |
| Styling | Tailwind CSS v4 + CSS custom properties for gold/dark palette |
| Fonts | Archivo via `next/font/google` |
| Images | `next/image`, sourced from buildx.vn |
| Animations | Framer Motion (scroll fade-ins, transitions) |
| Carousel | Embla Carousel (pricing + BIM image sliders) |
| Output | `next build` + `output: 'export'` (fully static) |

## Color Palette

```css
--color-gold: #FFB800;
--color-dark: #111111;
--color-dark-2: #1a1a1a;
--color-white: #ffffff;
--color-gray: #888888;
```

## Site Sections (8 total)

1. **Hero** — Full-viewport background image with dark overlay, company tagline, CTA button
2. **About** — Vision, mission, philosophy with supporting imagery
3. **BIM Solutions** — Feature showcase (3D modeling, MEP, 4D sequencing) with Embla image slider
4. **Design & Consulting** — 4 service cards: structural, interior, exterior, architectural
5. **Construction** — Service overview with image and description
6. **Pricing** — Draggable Embla Carousel with 3 design packages + BIM pricing tiers
7. **News** — Card grid of project case studies and brand updates
8. **Contact + Footer** — Address, phone, email, social links (Facebook, YouTube, TikTok), tax ID

## Navigation

- **Navbar** — Fixed top bar: logo left, anchor links center, VI/EN language switcher right
- **SideNav** — Numbered dots 1–8 on right edge, active section highlighted via `IntersectionObserver`
- **MobileMenu** — Hamburger → fullscreen dark overlay with all section links
- **PageLoader** — Entry animation on first load (matches original)

## i18n

- Locale routing: `/vi/...` (default, redirects from `/`) and `/en/...`
- Translation files: `messages/vi.json` and `messages/en.json`
- All user-facing strings extracted to translation keys
- Language switcher in Navbar swaps locale prefix, preserving current path

## Component Structure

```
app/
  [locale]/
    layout.tsx        ← html lang, next-intl provider, fonts
    page.tsx          ← composes all 8 section components

components/
  layout/
    Navbar.tsx
    SideNav.tsx
    MobileMenu.tsx
    Footer.tsx
    PageLoader.tsx
  sections/
    HeroSection.tsx
    AboutSection.tsx
    BimSection.tsx
    DesignSection.tsx
    ConstructionSection.tsx
    PricingSection.tsx
    NewsSection.tsx
    ContactSection.tsx
  ui/
    SectionTitle.tsx
    AnimatedText.tsx
    LanguageSwitcher.tsx
    ServiceCard.tsx
    PricingCard.tsx
    NewsCard.tsx

messages/
  vi.json
  en.json

public/
  images/             ← all images downloaded from buildx.vn
```

## Content

All text content matches buildx.vn exactly in Vietnamese. English translations are provided for all strings. Pricing values:

- Architecture design: 150,000 VND/m²
- Interior design: 150,000 VND/m²
- Complete design: 240,000 VND/m²
- Architecture/Structure BIM: 15,000 VND/m²
- MEP BIM: 20,000 VND/m²
- Conflict detection: 10,000 VND/m²

Contact: Đường Xuân Thuỷ, Phường Cẩm Lệ, TP Đà Nẵng | Hotline: 0236 3 79 79 39 | Tax: 0402135286

## Out of Scope

- Contact form backend (static only)
- CMS / admin panel
- Any content changes from the original
