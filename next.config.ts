import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')
const basePath = process.env.NODE_ENV === 'production' ? '/buildx' : ''

const nextConfig: NextConfig = {
  typescript: {
    // Next.js 16.2.2 ships a corrupted build-complete.d.ts that causes a parse
    // error TypeScript cannot suppress with skipLibCheck. Run `tsc --noEmit`
    // separately to catch type errors in your own code.
    ignoreBuildErrors: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: basePath,
  trailingSlash: false,
}

export default withNextIntl(nextConfig)
