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
        className={`px-2 py-1 transition-colors cursor-pointer ${
          locale === 'vi' ? 'text-[#FFB800]' : 'text-white/50 hover:text-white'
        }`}
      >
        VI
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`px-2 py-1 transition-colors cursor-pointer ${
          locale === 'en' ? 'text-[#FFB800]' : 'text-white/50 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
