# Dark/Light Theme Toggle — Design Spec

**Date:** 2026-04-04
**Status:** Approved

---

## Overview

Add a dark/light theme toggle to the BuildX site. The toggle affects every section. State is persisted to `localStorage` and applied via a class on `<html>` to avoid a flash of unstyled content (FOUC) on page load. No React context is needed — the toggle is a pure DOM + CSS operation.

---

## Color Tokens

CSS custom properties defined in `globals.css`. Light is the `:root` default; dark overrides live in `html.dark`.

| Token | Light | Dark |
|---|---|---|
| `--bg-primary` | `#ffffff` | `#111111` |
| `--bg-secondary` | `#f5f5f5` | `#0d0d0d` |
| `--bg-card` | `#ffffff` | `#1a1a1a` |
| `--text-primary` | `#111111` | `#ffffff` |
| `--text-muted` | `rgba(0,0,0,0.6)` | `rgba(255,255,255,0.6)` |
| `--text-subtle` | `rgba(0,0,0,0.4)` | `rgba(255,255,255,0.3)` |
| `--border` | `rgba(0,0,0,0.08)` | `rgba(255,255,255,0.1)` |
| `--bg-nav` | `rgba(255,255,255,0.95)` | `rgba(17,17,17,0.95)` |
| `--accent` | `#FFB800` | `#FFB800` |

The `body` background switches via `background-color: var(--bg-primary)`.

---

## Anti-FOUC Script

An inline `<script>` added to `<head>` in `app/layout.tsx` reads `localStorage` and applies `html.dark` before first paint:

```html
<script dangerouslySetInnerHTML={{ __html: `
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'light') { document.documentElement.classList.remove('dark'); }
    else { document.documentElement.classList.add('dark'); }
  })();
` }} />
```

Default is **dark** (matches current site) — the script adds `dark` unless `localStorage` explicitly says `'light'`.

---

## ThemeToggle Component

New file: `components/layout/ThemeToggle.tsx`

- `'use client'`
- Reads initial state from `document.documentElement.classList.contains('dark')`
- On click: toggles `dark` class on `html`, saves `'dark'` or `'light'` to `localStorage`, updates local `useState`
- Renders a sun icon (light mode) or moon icon (dark mode) — SVG inline, no icon library needed
- Placed in `Navbar` next to `LanguageSwitcher`

---

## Files Changed

### `globals.css`
- Add `:root` block with all CSS tokens
- Add `html.dark` block with dark overrides
- Update `body { background-color: var(--bg-primary); color: var(--text-primary); }`

### `app/layout.tsx`
- Add anti-FOUC `<script>` inside `<head>`

### `components/layout/ThemeToggle.tsx`
- New component (described above)

### `components/layout/Navbar.tsx`
- Import and render `<ThemeToggle />` next to `<LanguageSwitcher />`
- Update scrolled background: add `--bg-nav` token (`rgba(255,255,255,0.95)` light / `rgba(17,17,17,0.95)` dark) to the CSS token table; replace `bg-[#111]/95` with an inline style using `var(--bg-nav)`

### `components/layout/SideNav.tsx`
- Move inline styles for dot appearance into `.sidenav-dot` and `.sidenav-dot--active` classes defined in `globals.css @layer components`, using CSS vars for colors. SideNav applies these class names instead of inline styles.

### Sections (bg color only)
| File | Old class | New class |
|---|---|---|
| `AboutSection` | `bg-[#111]` | `bg-[var(--bg-primary)]` |
| `BimSection` | `bg-[#0d0d0d]` | `bg-[var(--bg-secondary)]` |
| `DesignSection` | `bg-[#111]` | `bg-[var(--bg-primary)]` |
| `ConstructionSection` | `bg-[#111]` | `bg-[var(--bg-primary)]` |
| `PricingSection` | `bg-[#0d0d0d]` | `bg-[var(--bg-secondary)]` |
| `NewsSection` | `bg-white` | `bg-[var(--bg-primary)]` |
| `ContactSection` | `bg-[#f5f5f5]` | `bg-[var(--bg-secondary)]` |

### Text/border colors in sections
All hardcoded `text-white`, `text-white/60`, `text-black/60`, `border-white/10`, `bg-[#1a1a1a]` etc. replaced with CSS var equivalents using `color: var(--text-primary)` inline styles or `text-[var(--text-primary)]` Tailwind syntax.

### `NewsCard.tsx`
- `bg-white` → `bg-[var(--bg-card)]`
- `text-[#111]` → `text-[var(--text-primary)]`
- `text-black/60` → `text-[var(--text-muted)]`
- `border-black/[0.08]` → `border-[var(--border)]`

### `ContactSection.tsx`
- All `text-[#111]`, `text-black/60`, `text-black/40`, `text-black/50` → CSS var equivalents

---

## Out of Scope

- System preference (`prefers-color-scheme`) detection — default is always dark, user controls it manually
- Per-section overrides — all sections follow the same token system
- Animated theme transition — no cross-fade, instant switch
