# BuildX Next.js Rebuild — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild buildx.vn as a fully static Next.js 16 site with Vietnamese/English i18n, same content, images, and visual style.

**Architecture:** Single-page marketing site using Next.js 16 App Router with a `[locale]` dynamic segment for i18n via next-intl (no middleware — static export compatible). All 8 sections render in one `page.tsx`. Static HTML/CSS/JS output via `output: 'export'`.

**Tech Stack:** Next.js 16, TypeScript, next-intl, Tailwind CSS v4, Framer Motion, Embla Carousel

---

## File Map

```
app/
  page.tsx                          ← client redirect → /vi
  [locale]/
    layout.tsx                      ← html lang, fonts, NextIntlClientProvider, PageLoader
    page.tsx                        ← imports all 8 sections
i18n/
  routing.ts                        ← defineRouting (locales, defaultLocale)
  navigation.ts                     ← createNavigation exports
  request.ts                        ← getRequestConfig
middleware.ts                       ← createMiddleware (dev locale detection)
messages/
  vi.json                           ← all Vietnamese strings
  en.json                           ← all English strings
components/
  layout/
    Navbar.tsx                      ← fixed top bar, logo, anchor links, lang switcher
    SideNav.tsx                     ← numbered dots 1-8, IntersectionObserver
    MobileMenu.tsx                  ← fullscreen overlay, hamburger toggle
    Footer.tsx                      ← address, social links, tax info
    PageLoader.tsx                  ← entry animation, fades out after mount
  sections/
    HeroSection.tsx                 ← full-viewport bg image, headline, CTA
    AboutSection.tsx                ← vision, mission, philosophy + image
    BimSection.tsx                  ← feature list + Embla image slider
    DesignSection.tsx               ← 4 service cards
    ConstructionSection.tsx         ← service overview + image
    PricingSection.tsx              ← Embla draggable pricing cards
    NewsSection.tsx                 ← card grid
    ContactSection.tsx              ← address, map, social links
  ui/
    SectionTitle.tsx                ← gold-accented section heading
    AnimatedText.tsx                ← Framer Motion fade-in on scroll
    LanguageSwitcher.tsx            ← VI / EN toggle
    ServiceCard.tsx                 ← design service card with image
    PricingCard.tsx                 ← pricing tier card
    NewsCard.tsx                    ← news article card
public/
  images/                           ← all images downloaded from buildx.vn
next.config.ts                      ← withNextIntl, output: export, images: unoptimized
app/globals.css                     ← Tailwind v4 @import, @theme tokens, base styles
```

---

## Task 1: Scaffold Next.js 16 project

**Files:**
- Create: `package.json`, `next.config.ts`, `tsconfig.json`, `app/globals.css`, `app/layout.tsx`

- [ ] **Step 1: Scaffold with create-next-app**

```bash
cd /Users/hoai/projects/personal/thanh
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

Expected output: "Success! Created project at ..."

- [ ] **Step 2: Verify Next.js version is 16**

```bash
cat package.json | grep '"next"'
```

Expected: `"next": "^16.x.x"` or similar. If it installed an older version, run:

```bash
npm install next@latest
```

- [ ] **Step 3: Install additional dependencies**

```bash
npm install next-intl framer-motion embla-carousel-react
npm install --save-dev @types/node
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -20
kill %1
```

Expected: HTML output with no errors.

- [ ] **Step 5: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js 16 project with dependencies"
```

---

## Task 2: Configure Tailwind CSS v4 + design tokens

**Files:**
- Modify: `app/globals.css`
- Delete: `tailwind.config.ts` (v4 uses CSS-first config)

- [ ] **Step 1: Replace globals.css with v4 config + design tokens**

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-gold: #FFB800;
  --color-dark: #111111;
  --color-dark-2: #1a1a1a;
  --color-gray-muted: #888888;
  --color-overlay: rgba(0, 0, 0, 0.6);

  --font-archivo: "Archivo", sans-serif;

  --spacing-section: 100px;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    background-color: #111111;
    color: #ffffff;
    font-family: var(--font-archivo);
    overflow-x: hidden;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
}
```

- [ ] **Step 2: Delete v3 config file if present**

```bash
rm -f tailwind.config.ts tailwind.config.js
```

- [ ] **Step 3: Verify Tailwind v4 is installed**

```bash
cat node_modules/tailwindcss/package.json | grep '"version"'
```

Expected: version 4.x.x. If v3 is installed:

```bash
npm install tailwindcss@^4 @tailwindcss/postcss@^4
```

Then update `postcss.config.mjs`:

```js
// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

- [ ] **Step 4: Commit**

```bash
git add app/globals.css postcss.config.mjs
git commit -m "feat: configure Tailwind CSS v4 with design tokens"
```

---

## Task 3: Set up next-intl i18n routing

**Files:**
- Create: `i18n/routing.ts`
- Create: `i18n/navigation.ts`
- Create: `i18n/request.ts`
- Create: `middleware.ts`
- Modify: `next.config.ts`

- [ ] **Step 1: Create i18n routing config**

```ts
// i18n/routing.ts
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['vi', 'en'],
  defaultLocale: 'vi',
});
```

- [ ] **Step 2: Create navigation helpers**

```ts
// i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

- [ ] **Step 3: Create request config**

```ts
// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

- [ ] **Step 4: Create middleware**

```ts
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)'],
};
```

- [ ] **Step 5: Update next.config.ts**

```ts
// next.config.ts
import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
};

export default withNextIntl(nextConfig);
```

- [ ] **Step 6: Create root redirect page**

```tsx
// app/page.tsx
'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/vi');
  }, [router]);
  return null;
}
```

- [ ] **Step 7: Update root app/layout.tsx (keep it minimal — html/body live here)**

`create-next-app` already generated `app/layout.tsx`. Replace its contents:

```tsx
// app/layout.tsx
import type {ReactNode} from 'react';

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 8: Create placeholder locale layout and page to verify routing**

```bash
mkdir -p "app/[locale]"
```

```tsx
// app/[locale]/layout.tsx (temporary placeholder — full version in Task 6)
import {ReactNode} from 'react';
export default function LocaleLayout({children}: {children: ReactNode}) {
  return <>{children}</>;
}
export function generateStaticParams() {
  return [{locale: 'vi'}, {locale: 'en'}];
}
```

```tsx
// app/[locale]/page.tsx (temporary placeholder)
export default function Page() {
  return <div>BuildX</div>;
}
```

- [ ] **Step 9: Verify build has no i18n errors**

```bash
npm run build 2>&1 | tail -20
```

Expected: "Export successful" with routes for `/vi` and `/en`.

- [ ] **Step 10: Commit**

```bash
git add i18n/ middleware.ts next.config.ts app/
git commit -m "feat: set up next-intl i18n with vi/en locales"
```

---

## Task 4: Translation files

**Files:**
- Create: `messages/vi.json`
- Create: `messages/en.json`

- [ ] **Step 1: Create Vietnamese translation file**

```json
{
  "nav": {
    "about": "Giới thiệu",
    "bim": "Giải pháp BIM",
    "design": "Thiết kế & Tư vấn",
    "construction": "Thi công",
    "pricing": "Bảng giá",
    "news": "Tin tức",
    "contact": "Liên hệ"
  },
  "hero": {
    "headline": "Trong một ngành xây dựng đang chuyển mình mạnh mẽ, chúng tôi tin rằng tương lai của mọi công trình không chỉ nằm ở thép và bê tông mà khởi nguồn từ những mô hình số chính xác, thông minh và giàu dữ liệu.",
    "cta": "Khám phá dịch vụ"
  },
  "about": {
    "title": "Về chúng tôi",
    "vision_label": "Tầm nhìn",
    "vision": "Trở thành đối tác uy tín hàng đầu Việt Nam trong việc kiến tạo không gian sống và làm việc bền vững, dựa trên năng lực BIM vượt trội, thiết kế kiến trúc-nội thất sáng tạo và thi công chuẩn mực.",
    "mission_label": "Sứ mệnh",
    "mission": "BuildX không ngừng học hỏi, đổi mới để mang lại giá trị bền vững cho khách hàng và cộng đồng thông qua các dự án xây dựng, kiến trúc và nội thất."
  },
  "bim": {
    "title": "Giải pháp BIM",
    "subtitle": "Giải pháp thiết kế & thi công thông minh với công nghệ BIM tại BuildX",
    "description": "Tại BuildX, chúng tôi ứng dụng BIM (Building Information Modeling) để quản lý toàn bộ vòng đời công trình — từ thiết kế, thi công đến vận hành.",
    "features": [
      "Mô hình hóa 3D kiến trúc, kết cấu và MEPF",
      "Trích xuất khối lượng",
      "Phối hợp xung đột 3D",
      "Biện pháp thi công",
      "Trình tự thi công BIM4D"
    ]
  },
  "design": {
    "title": "Thiết kế & Tư vấn",
    "description": "BUILDX tự hào cung cấp một loạt các dịch vụ chất lượng cao, được thiết kế để đáp ứng nhu cầu đa dạng của khách hàng.",
    "services": [
      {"name": "Thiết kế Kiến trúc", "description": "Giải pháp kiến trúc sáng tạo, phù hợp với từng không gian và nhu cầu."},
      {"name": "Thiết kế Kết cấu", "description": "Thiết kế kết cấu công trình an toàn, bền vững và tối ưu chi phí."},
      {"name": "Thiết kế Nội thất", "description": "Không gian nội thất hiện đại, tinh tế và đồng bộ."},
      {"name": "Thiết kế Ngoại thất", "description": "Ngoại thất ấn tượng, tạo dấu ấn riêng cho từng công trình."}
    ]
  },
  "construction": {
    "title": "Thi công",
    "description": "Đội ngũ thi công chuyên nghiệp, đảm bảo tiến độ và chất lượng công trình theo đúng tiêu chuẩn kỹ thuật."
  },
  "pricing": {
    "title": "Bảng giá",
    "subtitle": "Giải pháp linh hoạt cho mọi nhu cầu",
    "design_tab": "Thiết kế",
    "bim_tab": "BIM",
    "unit": "VND/m²",
    "includes": "Bao gồm",
    "design_packages": [
      {
        "name": "Gói 1",
        "label": "Thiết kế Kiến Trúc",
        "price": "150.000",
        "items": ["Bản vẽ kiến trúc đầy đủ", "Phối cảnh 3D", "Hồ sơ xin phép xây dựng", "Tư vấn vật liệu"]
      },
      {
        "name": "Gói 2",
        "label": "Thiết kế Nội Thất",
        "price": "150.000",
        "items": ["Bản vẽ nội thất chi tiết", "Phối cảnh 3D nội thất", "Danh mục vật tư", "Tư vấn màu sắc"]
      },
      {
        "name": "Gói 3",
        "label": "Thiết kế Trọn Gói",
        "price": "240.000",
        "items": ["Kiến trúc + Nội thất + Ngoại thất", "Hồ sơ thiết kế đầy đủ", "Phối cảnh 3D toàn diện", "Hỗ trợ thi công"]
      }
    ],
    "bim_packages": [
      {
        "name": "Gói 1",
        "label": "Mô hình BIM (LOD 300–350)",
        "price": "15.000",
        "items": ["Mô hình 3D kiến trúc & kết cấu", "Trích xuất khối lượng", "Bản vẽ 2D từ mô hình", "Hỗ trợ thiết kế"]
      },
      {
        "name": "Gói 2",
        "label": "Mô hình BIM MEPF",
        "price": "20.000",
        "items": ["Mô hình MEP đầy đủ", "Phối hợp đa chuyên ngành", "Kiểm tra xung đột tự động", "Báo cáo phối hợp"]
      },
      {
        "name": "Gói 3",
        "label": "Kiểm tra xung đột & Cập nhật",
        "price": "10.000",
        "items": ["Phát hiện xung đột", "Báo cáo xung đột chi tiết", "Cập nhật mô hình", "Hỗ trợ giải quyết"]
      }
    ]
  },
  "news": {
    "title": "Tin tức",
    "read_more": "Đọc thêm",
    "articles": [
      {
        "title": "Logo là yếu tố cốt lõi của hệ nhận diện thương hiệu BuildX",
        "excerpt": "Quy chuẩn sử dụng logo giúp đảm bảo hình ảnh thương hiệu luôn đồng bộ, chuyên nghiệp trên mọi nền tảng truyền thông.",
        "image": "news-1.png"
      },
      {
        "title": "BuildX chính thức giới thiệu Bộ nhận diện văn phòng hoàn chỉnh",
        "excerpt": "Bộ sản phẩm bao gồm: danh thiếp, phong bì thư, sổ tay, thẻ nhân viên, áo đồng phục, áo phản quang, túi đựng tài liệu, tất.",
        "image": "news-2.png"
      },
      {
        "title": "Dự án tiêu biểu: Ứng dụng BIM trong công trình dân dụng",
        "excerpt": "BuildX đã thành công triển khai BIM cho nhiều dự án dân dụng, mang lại hiệu quả cao trong thi công.",
        "image": "news-3.png"
      }
    ]
  },
  "contact": {
    "title": "Liên hệ",
    "company": "CÔNG TY CỔ PHẦN ĐẦU TƯ BUILDX",
    "address": "Đường Xuân Thuỷ, Phường Cẩm Lệ, TP Đà Nẵng",
    "hotline_label": "Hotline",
    "hotline": "0236 3 79 79 39",
    "tax_label": "MST",
    "tax": "0402135286",
    "follow": "Theo dõi chúng tôi"
  }
}
```

Save this to `messages/vi.json`.

- [ ] **Step 2: Create English translation file**

```json
{
  "nav": {
    "about": "About",
    "bim": "BIM Solutions",
    "design": "Design & Consulting",
    "construction": "Construction",
    "pricing": "Pricing",
    "news": "News",
    "contact": "Contact"
  },
  "hero": {
    "headline": "In a rapidly transforming construction industry, we believe the future of every project lies not merely in steel and concrete, but originates from precise, intelligent, data-rich digital models.",
    "cta": "Explore our services"
  },
  "about": {
    "title": "About Us",
    "vision_label": "Vision",
    "vision": "To become Vietnam's most trusted partner in creating sustainable living and working spaces, built on superior BIM capabilities, innovative architectural-interior design, and quality construction.",
    "mission_label": "Mission",
    "mission": "BuildX continuously learns and innovates to deliver lasting value to clients and the community through construction, architectural, and interior projects."
  },
  "bim": {
    "title": "BIM Solutions",
    "subtitle": "Smart design & construction solutions with BIM technology at BuildX",
    "description": "At BuildX, we apply BIM (Building Information Modeling) to manage the entire lifecycle of a project — from design and construction to operations.",
    "features": [
      "3D modeling of architecture, structure, and MEPF",
      "Quantity extraction",
      "3D clash detection",
      "Construction methodology planning",
      "BIM4D construction sequencing"
    ]
  },
  "design": {
    "title": "Design & Consulting",
    "description": "BUILDX is proud to offer a wide range of high-quality services designed to meet the diverse needs of our clients.",
    "services": [
      {"name": "Architectural Design", "description": "Creative architectural solutions tailored to each space and need."},
      {"name": "Structural Design", "description": "Safe, durable, and cost-optimized structural engineering."},
      {"name": "Interior Design", "description": "Modern, refined, and cohesive interior spaces."},
      {"name": "Exterior Design", "description": "Impressive exteriors that create a unique identity for each project."}
    ]
  },
  "construction": {
    "title": "Construction",
    "description": "Professional construction teams ensuring project timelines and quality according to technical standards."
  },
  "pricing": {
    "title": "Pricing",
    "subtitle": "Flexible solutions for every need",
    "design_tab": "Design",
    "bim_tab": "BIM",
    "unit": "VND/m²",
    "includes": "Includes",
    "design_packages": [
      {
        "name": "Package 1",
        "label": "Architectural Design",
        "price": "150,000",
        "items": ["Complete architectural drawings", "3D renders", "Building permit documents", "Material consultation"]
      },
      {
        "name": "Package 2",
        "label": "Interior Design",
        "price": "150,000",
        "items": ["Detailed interior drawings", "3D interior renders", "Material schedule", "Color consultation"]
      },
      {
        "name": "Package 3",
        "label": "Complete Design",
        "price": "240,000",
        "items": ["Architecture + Interior + Exterior", "Full design documentation", "Comprehensive 3D renders", "Construction support"]
      }
    ],
    "bim_packages": [
      {
        "name": "Package 1",
        "label": "BIM Model (LOD 300–350)",
        "price": "15,000",
        "items": ["3D architectural & structural model", "Quantity extraction", "2D drawings from model", "Design support"]
      },
      {
        "name": "Package 2",
        "label": "MEPF BIM Model",
        "price": "20,000",
        "items": ["Full MEP model", "Multi-discipline coordination", "Automated clash detection", "Coordination reports"]
      },
      {
        "name": "Package 3",
        "label": "Clash Detection & Updates",
        "price": "10,000",
        "items": ["Clash detection", "Detailed clash reports", "Model updates", "Resolution support"]
      }
    ]
  },
  "news": {
    "title": "News",
    "read_more": "Read more",
    "articles": [
      {
        "title": "Logo is the core element of BuildX brand identity",
        "excerpt": "Logo usage standards ensure that brand image remains consistent and professional across all media platforms.",
        "image": "news-1.png"
      },
      {
        "title": "BuildX officially introduces complete office identity kit",
        "excerpt": "The product set includes: business cards, envelopes, notebooks, employee ID cards, uniforms, reflective vests, document bags, socks.",
        "image": "news-2.png"
      },
      {
        "title": "Featured project: BIM application in residential construction",
        "excerpt": "BuildX has successfully implemented BIM for many residential projects, delivering high efficiency in construction.",
        "image": "news-3.png"
      }
    ]
  },
  "contact": {
    "title": "Contact",
    "company": "BUILDX INVESTMENT JOINT STOCK COMPANY",
    "address": "Xuan Thuy Street, Cam Le Ward, Da Nang City",
    "hotline_label": "Hotline",
    "hotline": "0236 3 79 79 39",
    "tax_label": "Tax ID",
    "tax": "0402135286",
    "follow": "Follow us"
  }
}
```

Save this to `messages/en.json`.

- [ ] **Step 3: Commit**

```bash
git add messages/
git commit -m "feat: add Vietnamese and English translation files"
```

---

## Task 5: Download images from buildx.vn

**Files:**
- Create: `public/images/` directory with all images

- [ ] **Step 1: Create images directory and download all images**

```bash
mkdir -p public/images

curl -L "https://buildx.vn/wp-content/uploads/2026/03/logo-1.png" -o public/images/logo.png
curl -L "https://buildx.vn/wp-content/uploads/2026/03/logo-2.png" -o public/images/logo-loader.png
curl -L "https://buildx.vn/wp-content/uploads/2026/03/banner-web.png" -o public/images/hero-bg.png
curl -L "https://buildx.vn/wp-content/uploads/2026/03/anh-web-1024x1024.png" -o public/images/about.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-08-07_17-58-42-1024x596.png" -o public/images/bim-1.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-08-07_18-29-41-1024x536.png" -o public/images/bim-2.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-01-02_15-47-29.1_221527-1024x547.png" -o public/images/bim-3.png
curl -L "https://buildx.vn/wp-content/uploads/2026/03/FU-VC25-SD-P01_Son-Chong-tham-Page-004-Copy-1024x724.png" -o public/images/bim-4.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-08-08_08-28-17-1024x555.png" -o public/images/bim-5.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-08-07_13-49-25-1024x432.png" -o public/images/bim-6.png
curl -L "https://buildx.vn/wp-content/uploads/2026/03/Thiet-ke-chua-co-ten-1024x539.png" -o public/images/bim-7.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/HE-BAO-CHE1-1024x499.png" -o public/images/bim-8.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-08-07_17-20-36-1024x576.png" -o public/images/bim-9.png
curl -L "https://buildx.vn/wp-content/uploads/2025/08/2025-08-07_17-23-20-1024x576.png" -o public/images/bim-10.png
curl -L "https://buildx.vn/wp-content/uploads/2025/07/bang-02-01-1024x724.png" -o public/images/news-1.png
curl -L "https://buildx.vn/wp-content/uploads/2025/06/10578804-scaled.png" -o public/images/news-2.png
curl -L "https://buildx.vn/wp-content/uploads/2025/07/bang-02-scaled.png" -o public/images/news-3.png
```

- [ ] **Step 2: Verify downloads**

```bash
ls -lh public/images/
```

Expected: 18 image files, all >0 bytes.

- [ ] **Step 3: Commit**

```bash
git add public/images/
git commit -m "feat: download all images from buildx.vn"
```

---

## Task 6: App layout — fonts, providers, root page

**Files:**
- Create: `components/layout/LangUpdater.tsx`
- Modify: `app/layout.tsx` (add Archivo font + globals.css)
- Modify: `app/[locale]/layout.tsx` (full layout — no html/body, those live in root layout)
- Modify: `app/page.tsx` (root redirect)

- [ ] **Step 1: Create LangUpdater client component**

This sets `document.documentElement.lang` on the client so each locale gets the correct `lang` attribute without duplicating `<html>` in the nested layout.

```tsx
// components/layout/LangUpdater.tsx
'use client';
import {useEffect} from 'react';

export default function LangUpdater({locale}: {locale: string}) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);
  return null;
}
```

- [ ] **Step 2: Update root app/layout.tsx with font and globals**

```tsx
// app/layout.tsx
import type {ReactNode} from 'react';
import type {Metadata} from 'next';
import {Archivo} from 'next/font/google';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BuildX — Giải pháp BIM & Thiết kế',
  description: 'Công ty Cổ phần Đầu tư BuildX — Giải pháp BIM, Thiết kế và Thi công chuyên nghiệp tại Đà Nẵng.',
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className={archivo.variable}>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Replace placeholder locale layout with full version**

```tsx
// app/[locale]/layout.tsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import LangUpdater from '@/components/layout/LangUpdater';
import PageLoader from '@/components/layout/PageLoader';
import type {ReactNode} from 'react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Props = {
  children: ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;

  if (!routing.locales.includes(locale as 'vi' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <LangUpdater locale={locale} />
      <PageLoader />
      {children}
    </NextIntlClientProvider>
  );
}
```

- [ ] **Step 4: Create root page redirect**

```tsx
// app/page.tsx
'use client';
import {useEffect} from 'react';
import {useRouter} from 'next/navigation';

export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/vi');
  }, [router]);
  return null;
}
```

- [ ] **Step 5: Verify build**

```bash
npm run build 2>&1 | tail -30
```

Expected: build succeeds with `/vi` and `/en` routes generated.

- [ ] **Step 6: Commit**

```bash
git add app/ components/layout/LangUpdater.tsx
git commit -m "feat: set up locale layout with Archivo font and NextIntl provider"
```

---

## Task 7: PageLoader component

**Files:**
- Create: `components/layout/PageLoader.tsx`

- [ ] **Step 1: Create PageLoader**

```tsx
// components/layout/PageLoader.tsx
'use client';
import {useEffect, useState} from 'react';
import Image from 'next/image';

export default function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111]"
      style={{
        animation: visible ? 'none' : 'fadeOut 0.5s ease forwards',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/logo-loader.png"
          alt="BuildX"
          width={160}
          height={60}
          priority
          style={{filter: 'brightness(0) invert(1)'}}
        />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#FFB800]"
              style={{
                animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
```

- [ ] **Step 2: Verify PageLoader is already wired in locale layout**

Task 6 already added `<PageLoader />` to `app/[locale]/layout.tsx` inside `<NextIntlClientProvider>`. No additional changes needed.

- [ ] **Step 3: Commit**

```bash
git add components/layout/PageLoader.tsx app/[locale]/layout.tsx
git commit -m "feat: add PageLoader entry animation"
```

---

## Task 8: Shared UI components

**Files:**
- Create: `components/ui/SectionTitle.tsx`
- Create: `components/ui/AnimatedText.tsx`
- Create: `components/ui/LanguageSwitcher.tsx`
- Create: `components/ui/ServiceCard.tsx`
- Create: `components/ui/PricingCard.tsx`
- Create: `components/ui/NewsCard.tsx`

- [ ] **Step 1: SectionTitle**

```tsx
// components/ui/SectionTitle.tsx
interface SectionTitleProps {
  label?: string;
  title: string;
  className?: string;
}

export default function SectionTitle({label, title, className = ''}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <p className="text-[#FFB800] text-xs font-bold tracking-[4px] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        {title}
      </h2>
      <div className="mt-4 w-12 h-0.5 bg-[#FFB800]" />
    </div>
  );
}
```

- [ ] **Step 2: AnimatedText**

```tsx
// components/ui/AnimatedText.tsx
'use client';
import {motion} from 'framer-motion';
import {ReactNode} from 'react';

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export default function AnimatedText({children, delay = 0, className = ''}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 30}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, margin: '-50px'}}
      transition={{duration: 0.7, delay, ease: 'easeOut'}}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: LanguageSwitcher**

```tsx
// components/ui/LanguageSwitcher.tsx
'use client';
import {useLocale} from 'next-intl';
import {useRouter, usePathname} from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale(next: string) {
    router.replace(pathname, {locale: next});
  }

  return (
    <div className="flex items-center gap-1 text-xs font-bold tracking-widest">
      <button
        onClick={() => switchLocale('vi')}
        className={`px-2 py-1 transition-colors ${
          locale === 'vi' ? 'text-[#FFB800]' : 'text-white/50 hover:text-white'
        }`}
      >
        VI
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 transition-colors ${
          locale === 'en' ? 'text-[#FFB800]' : 'text-white/50 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
```

- [ ] **Step 4: ServiceCard**

```tsx
// components/ui/ServiceCard.tsx
'use client';
import {motion} from 'framer-motion';

interface ServiceCardProps {
  name: string;
  description: string;
  index: number;
}

export default function ServiceCard({name, description, index}: ServiceCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6, delay: index * 0.1}}
      className="group relative bg-[#1a1a1a] border border-white/10 rounded-sm p-8 hover:border-[#FFB800]/50 transition-all duration-300 cursor-default"
    >
      <div className="w-8 h-0.5 bg-[#FFB800] mb-6 group-hover:w-16 transition-all duration-300" />
      <h3 className="text-lg font-bold text-white mb-3">{name}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FFB800] group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}
```

- [ ] **Step 5: PricingCard**

```tsx
// components/ui/PricingCard.tsx
interface PricingItem {
  name: string;
  label: string;
  price: string;
  items: string[];
}

interface PricingCardProps {
  pkg: PricingItem;
  unit: string;
  includes: string;
}

export default function PricingCard({pkg, unit, includes}: PricingCardProps) {
  return (
    <div className="flex-none w-[320px] md:w-[380px] bg-[#1a1a1a] border border-white/10 rounded-sm p-8 select-none">
      <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-2">
        {pkg.name}
      </p>
      <h3 className="text-xl font-bold text-white mb-6">{pkg.label}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-[#FFB800]">{pkg.price}</span>
        <span className="text-white/40 text-sm ml-2">{unit}</span>
      </div>
      <div className="border-t border-white/10 pt-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-4">{includes}</p>
        <ul className="space-y-3">
          {pkg.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
              <span className="text-[#FFB800] mt-0.5 flex-none">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

- [ ] **Step 6: NewsCard**

```tsx
// components/ui/NewsCard.tsx
'use client';
import Image from 'next/image';
import {motion} from 'framer-motion';

interface NewsCardProps {
  title: string;
  excerpt: string;
  image: string;
  readMore: string;
  index: number;
}

export default function NewsCard({title, excerpt, image, readMore, index}: NewsCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6, delay: index * 0.1}}
      className="group bg-[#1a1a1a] overflow-hidden cursor-default"
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={`/images/${image}`}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-white font-bold text-base leading-snug mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <span className="text-[#FFB800] text-xs font-bold tracking-wider uppercase hover:text-white transition-colors">
          {readMore} →
        </span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 7: Commit**

```bash
git add components/ui/
git commit -m "feat: add shared UI components (SectionTitle, AnimatedText, LanguageSwitcher, ServiceCard, PricingCard, NewsCard)"
```

---

## Task 9: Navbar + MobileMenu

**Files:**
- Create: `components/layout/Navbar.tsx`
- Create: `components/layout/MobileMenu.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
// components/layout/Navbar.tsx
'use client';
import {useState, useEffect} from 'react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from './MobileMenu';

const NAV_ITEMS = [
  {key: 'about', href: '#about'},
  {key: 'bim', href: '#bim'},
  {key: 'design', href: '#design'},
  {key: 'construction', href: '#construction'},
  {key: 'pricing', href: '#pricing'},
  {key: 'news', href: '#news'},
  {key: 'contact', href: '#contact'},
] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
            {NAV_ITEMS.map(({key, href}) => (
              <a
                key={key}
                href={href}
                className="text-white/70 hover:text-[#FFB800] text-xs font-bold tracking-widest uppercase transition-colors"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="lg:hidden flex flex-col gap-1.5 p-2"
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
        navItems={NAV_ITEMS.map(({key, href}) => ({label: t(key), href}))}
      />
    </>
  );
}
```

- [ ] **Step 2: Create MobileMenu**

```tsx
// components/layout/MobileMenu.tsx
'use client';
import {useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: {label: string; href: string}[];
}

export default function MobileMenu({open, onClose, navItems}: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {document.body.style.overflow = ''};
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3}}
          className="fixed inset-0 z-[100] bg-[#111] flex flex-col"
        >
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white text-3xl leading-none"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navItems.map(({label, href}, i) => (
              <motion.a
                key={href}
                href={href}
                onClick={onClose}
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: i * 0.07}}
                className="text-white text-2xl font-bold tracking-widest uppercase hover:text-[#FFB800] transition-colors"
              >
                {label}
              </motion.a>
            ))}
          </nav>

          <div className="flex justify-center pb-10">
            <LanguageSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/layout/Navbar.tsx components/layout/MobileMenu.tsx
git commit -m "feat: add Navbar and MobileMenu components"
```

---

## Task 10: SideNav component

**Files:**
- Create: `components/layout/SideNav.tsx`

- [ ] **Step 1: Create SideNav with IntersectionObserver**

```tsx
// components/layout/SideNav.tsx
'use client';
import {useState, useEffect} from 'react';

const SECTIONS = ['about', 'bim', 'design', 'construction', 'pricing', 'news', 'contact'];

export default function SideNav() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {threshold: 0.4}
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 items-center">
      {SECTIONS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3"
          aria-label={`Go to section ${i + 1}`}
        >
          <span className={`text-[10px] font-bold transition-all duration-300 ${
            active === id ? 'text-[#FFB800] opacity-100' : 'text-white/0 group-hover:text-white/50'
          }`}>
            0{i + 1}
          </span>
          <span className={`block rounded-full transition-all duration-300 ${
            active === id
              ? 'w-2 h-2 bg-[#FFB800]'
              : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
          }`} />
        </a>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/SideNav.tsx
git commit -m "feat: add SideNav with IntersectionObserver active section tracking"
```

---

## Task 11: Footer

**Files:**
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// components/layout/Footer.tsx
import {useTranslations} from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('contact');

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <Image
              src="/images/logo.png"
              alt="BuildX"
              width={120}
              height={45}
              className="mb-4 object-contain"
              style={{filter: 'brightness(0) invert(1)'}}
            />
            <p className="text-white/50 text-xs leading-relaxed">{t('company')}</p>
          </div>

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{t('hotline_label')}</p>
            <p className="text-[#FFB800] text-lg font-bold">{t('hotline')}</p>
            <p className="text-white/50 text-xs mt-2">{t('address')}</p>
          </div>

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{t('follow')}</p>
            <div className="flex gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-[#FFB800] transition-colors text-sm font-bold">
                Facebook
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-[#FFB800] transition-colors text-sm font-bold">
                YouTube
              </a>
              <a href="https://tiktok.com/@buildxvn" target="_blank" rel="noopener noreferrer"
                className="text-white/50 hover:text-[#FFB800] transition-colors text-sm font-bold">
                TikTok
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-white/30 text-xs">
            {t('tax_label')}: {t('tax')}
          </p>
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} BuildX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Footer.tsx
git commit -m "feat: add Footer component"
```

---

## Task 12: HeroSection

**Files:**
- Create: `components/sections/HeroSection.tsx`

- [ ] **Step 1: Create HeroSection**

```tsx
// components/sections/HeroSection.tsx
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
          initial={{opacity: 0, y: 0, scaleX: 0}}
          animate={{opacity: 1, scaleX: 1}}
          transition={{duration: 0.8}}
          className="w-12 h-0.5 bg-[#FFB800] mx-auto mb-8"
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-[#FFB800]" />
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/HeroSection.tsx
git commit -m "feat: add HeroSection"
```

---

## Task 13: AboutSection

**Files:**
- Create: `components/sections/AboutSection.tsx`

- [ ] **Step 1: Create AboutSection**

```tsx
// components/sections/AboutSection.tsx
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedText>
            <SectionTitle title={t('title')} />
            <div className="space-y-10">
              <div>
                <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-3">
                  {t('vision_label')}
                </p>
                <p className="text-white/80 leading-relaxed">{t('vision')}</p>
              </div>
              <div>
                <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-3">
                  {t('mission_label')}
                </p>
                <p className="text-white/80 leading-relaxed">{t('mission')}</p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
              <Image
                src="/images/about.png"
                alt="About BuildX"
                fill
                className="object-cover"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-l-2 border-b-2 border-[#FFB800]" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-r-2 border-t-2 border-[#FFB800]" />
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/AboutSection.tsx
git commit -m "feat: add AboutSection"
```

---

## Task 14: BimSection

**Files:**
- Create: `components/sections/BimSection.tsx`

- [ ] **Step 1: Create BimSection with Embla image carousel**

```tsx
// components/sections/BimSection.tsx
'use client';
import {useCallback} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

const BIM_IMAGES = [
  'bim-1.png', 'bim-2.png', 'bim-3.png', 'bim-4.png', 'bim-5.png',
  'bim-6.png', 'bim-7.png', 'bim-8.png', 'bim-9.png', 'bim-10.png',
];

export default function BimSection() {
  const t = useTranslations('bim');
  const features = t.raw('features') as string[];
  const [emblaRef, emblaApi] = useEmblaCarousel({loop: true, dragFree: true});

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="bim" className="py-24 md:py-32 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          <AnimatedText>
            <SectionTitle title={t('title')} label="BIM" />
            <p className="text-[#FFB800] font-bold text-lg mb-4">{t('subtitle')}</p>
            <p className="text-white/70 leading-relaxed mb-8">{t('description')}</p>
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800] flex-none" />
                  {feature}
                </li>
              ))}
            </ul>
          </AnimatedText>

          <AnimatedText delay={0.15}>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {BIM_IMAGES.map((img, i) => (
                    <div key={i} className="flex-none w-full relative aspect-video">
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
              <div className="flex gap-3 mt-4 justify-end">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-white/20 hover:border-[#FFB800] text-white/60 hover:text-[#FFB800] transition-all flex items-center justify-center"
                  aria-label="Previous"
                >
                  ←
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-white/20 hover:border-[#FFB800] text-white/60 hover:text-[#FFB800] transition-all flex items-center justify-center"
                  aria-label="Next"
                >
                  →
                </button>
              </div>
            </div>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/BimSection.tsx
git commit -m "feat: add BimSection with Embla image carousel"
```

---

## Task 15: DesignSection

**Files:**
- Create: `components/sections/DesignSection.tsx`

- [ ] **Step 1: Create DesignSection**

```tsx
// components/sections/DesignSection.tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/DesignSection.tsx
git commit -m "feat: add DesignSection with 4 service cards"
```

---

## Task 16: ConstructionSection

**Files:**
- Create: `components/sections/ConstructionSection.tsx`

- [ ] **Step 1: Create ConstructionSection**

```tsx
// components/sections/ConstructionSection.tsx
import Image from 'next/image';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

export default function ConstructionSection() {
  const t = useTranslations('construction');

  return (
    <section id="construction" className="py-24 md:py-32 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <AnimatedText delay={0.1}>
            <div className="relative aspect-video overflow-hidden">
              <Image
                src="/images/bim-5.png"
                alt="Construction"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f]/40 to-transparent" />
            </div>
          </AnimatedText>

          <AnimatedText>
            <SectionTitle title={t('title')} />
            <p className="text-white/70 leading-relaxed text-lg">{t('description')}</p>
          </AnimatedText>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ConstructionSection.tsx
git commit -m "feat: add ConstructionSection"
```

---

## Task 17: PricingSection

**Files:**
- Create: `components/sections/PricingSection.tsx`

- [ ] **Step 1: Create PricingSection with Embla draggable carousel**

```tsx
// components/sections/PricingSection.tsx
'use client';
import {useState} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';
import PricingCard from '@/components/ui/PricingCard';

export default function PricingSection() {
  const t = useTranslations('pricing');
  const [tab, setTab] = useState<'design' | 'bim'>('design');
  const [emblaRef] = useEmblaCarousel({dragFree: true, align: 'start'});

  const designPackages = t.raw('design_packages') as {
    name: string; label: string; price: string; items: string[];
  }[];
  const bimPackages = t.raw('bim_packages') as {
    name: string; label: string; price: string; items: string[];
  }[];

  const packages = tab === 'design' ? designPackages : bimPackages;

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <SectionTitle title={t('title')} />
              <p className="text-white/50">{t('subtitle')}</p>
            </div>
            <div className="flex border border-white/20 rounded-sm overflow-hidden w-fit">
              <button
                onClick={() => setTab('design')}
                className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all ${
                  tab === 'design' ? 'bg-[#FFB800] text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {t('design_tab')}
              </button>
              <button
                onClick={() => setTab('bim')}
                className={`px-6 py-2.5 text-xs font-bold tracking-widest uppercase transition-all ${
                  tab === 'bim' ? 'bg-[#FFB800] text-black' : 'text-white/50 hover:text-white'
                }`}
              >
                {t('bim_tab')}
              </button>
            </div>
          </div>
        </AnimatedText>

        <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
          <div className="flex gap-6">
            {packages.map((pkg, i) => (
              <PricingCard
                key={`${tab}-${i}`}
                pkg={pkg}
                unit={t('unit')}
                includes={t('includes')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/PricingSection.tsx
git commit -m "feat: add PricingSection with tab switcher and Embla carousel"
```

---

## Task 18: NewsSection

**Files:**
- Create: `components/sections/NewsSection.tsx`

- [ ] **Step 1: Create NewsSection**

```tsx
// components/sections/NewsSection.tsx
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';
import NewsCard from '@/components/ui/NewsCard';

export default function NewsSection() {
  const t = useTranslations('news');
  const articles = t.raw('articles') as {
    title: string; excerpt: string; image: string;
  }[];

  return (
    <section id="news" className="py-24 md:py-32 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedText>
          <SectionTitle title={t('title')} className="mb-12" />
        </AnimatedText>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/NewsSection.tsx
git commit -m "feat: add NewsSection with card grid"
```

---

## Task 19: ContactSection

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Create ContactSection**

```tsx
// components/sections/ContactSection.tsx
import {useTranslations} from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import AnimatedText from '@/components/ui/AnimatedText';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#111]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <AnimatedText>
            <SectionTitle title={t('title')} />
            <div className="space-y-8">
              <div>
                <p className="text-[#FFB800] text-xs font-bold tracking-[3px] uppercase mb-2">
                  {t('company')}
                </p>
                <p className="text-white/70">{t('address')}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                  {t('hotline_label')}
                </p>
                <a
                  href={`tel:${t('hotline').replace(/\s/g, '')}`}
                  className="text-[#FFB800] text-2xl font-bold hover:text-white transition-colors"
                >
                  {t('hotline')}
                </a>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-2">
                  {t('tax_label')}
                </p>
                <p className="text-white/70">{t('tax')}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">
                  {t('follow')}
                </p>
                <div className="flex gap-6">
                  {[
                    {label: 'Facebook', href: 'https://facebook.com'},
                    {label: 'YouTube', href: 'https://youtube.com'},
                    {label: 'TikTok', href: 'https://tiktok.com/@buildxvn'},
                  ].map(({label, href}) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-[#FFB800] transition-colors text-sm font-bold tracking-widest uppercase"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <div className="w-full h-80 lg:h-full min-h-[320px] bg-[#1a1a1a] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.3!2d108.2!3d16.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDA!5e0!3m2!1svi!2svn!4v1"
                width="100%"
                height="100%"
                style={{border: 0, filter: 'invert(90%) hue-rotate(180deg)'}}
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
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ContactSection.tsx
git commit -m "feat: add ContactSection with map embed"
```

---

## Task 20: Assemble page.tsx and wire layout

**Files:**
- Modify: `app/[locale]/page.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Replace placeholder page.tsx with full assembled page**

```tsx
// app/[locale]/page.tsx
import Navbar from '@/components/layout/Navbar';
import SideNav from '@/components/layout/SideNav';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import BimSection from '@/components/sections/BimSection';
import DesignSection from '@/components/sections/DesignSection';
import ConstructionSection from '@/components/sections/ConstructionSection';
import PricingSection from '@/components/sections/PricingSection';
import NewsSection from '@/components/sections/NewsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SideNav />
      <main>
        <HeroSection />
        <AboutSection />
        <BimSection />
        <DesignSection />
        <ConstructionSection />
        <PricingSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Start dev server and visually verify each section**

```bash
npm run dev
```

Open http://localhost:3000 in browser. Verify:
- PageLoader animation on first load
- Navbar fixed at top, transparent then opaque on scroll
- SideNav dots visible on right, highlight active section
- All 8 sections render with correct Vietnamese text
- Framer Motion fade-in animations trigger on scroll
- Pricing tab switcher works
- BIM carousel auto-slides and has prev/next buttons
- Mobile: hamburger opens fullscreen menu
- Language switcher: clicking EN switches to English text

- [ ] **Step 3: Check EN locale**

Open http://localhost:3000/en — verify all text is in English.

- [ ] **Step 4: Commit**

```bash
git add app/[locale]/page.tsx
git commit -m "feat: assemble full page with all 8 sections"
```

---

## Task 21: Static export + final build

**Files:**
- Verify: `next.config.ts` has `output: 'export'`

- [ ] **Step 1: Run production build**

```bash
npm run build 2>&1
```

Expected output:
```
Route (app)                              Size     First Load JS
┌ ○ /                                   ...
├ ● /[locale]                           ...
│   ├ /en
│   └ /vi
```

No errors. "Export successful."

- [ ] **Step 2: Verify output directory**

```bash
ls out/
ls out/vi/
ls out/en/
```

Expected: `index.html` in both `out/vi/` and `out/en/`.

- [ ] **Step 3: Serve and test static output**

```bash
npx serve out -p 3001 &
sleep 2
open http://localhost:3001/vi
```

Verify the static build renders identically to the dev server. Check:
- All images load
- Language switcher navigates between /vi and /en
- Animations work
- Fonts load correctly

- [ ] **Step 4: Add .gitignore entry for superpowers**

```bash
echo ".superpowers/" >> .gitignore
```

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete BuildX Next.js 16 static site with vi/en i18n"
```
