import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function Footer() {
  const t = useTranslations('contact')

  return (
    <footer className="border-t border-white/10 bg-[#0a0a0a] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo.avif"
              alt="BuildX"
              width={120}
              height={45}
              className="mb-4 object-contain"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="text-xs leading-relaxed text-white/50">
              {t('company')}
            </p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-widest text-white/30 uppercase">
              {t('hotline_label')}
            </p>
            <p className="text-gold text-lg font-bold">{t('hotline')}</p>
            <p className="mt-2 text-xs text-white/50">{t('address')}</p>
          </div>

          <div>
            <p className="mb-4 text-xs tracking-widest text-white/30 uppercase">
              {t('follow')}
            </p>
            <div className="flex gap-4">
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
                  className="hover:text-gold text-sm font-bold text-white/50 transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 md:flex-row">
          <p className="text-xs text-white/30">
            {t('tax_label')}: {t('tax')}
          </p>
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} BuildX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
