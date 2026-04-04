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
              src="/images/logo.avif"
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
            <p className="text-gold text-lg font-bold">{t('hotline')}</p>
            <p className="text-white/50 text-xs mt-2">{t('address')}</p>
          </div>

          <div>
            <p className="text-white/30 text-xs uppercase tracking-widest mb-4">{t('follow')}</p>
            <div className="flex gap-4">
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
                  className="text-white/50 hover:text-gold transition-colors text-sm font-bold"
                >
                  {label}
                </a>
              ))}
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
