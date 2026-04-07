'use client'
import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function switchLocale(next: string) {
    router.replace(pathname, { locale: next })
  }

  return (
    <div className="hidden sm:flex items-center gap-1 text-xs font-bold tracking-widest">
      <button
        onClick={() => switchLocale('vi')}
        className={`cursor-pointer px-2 py-1 transition-colors ${locale === 'vi' ? 'text-gold' : 'text-(--text-subtle)'}`}
      >
        VI
      </button>
      <span className="text-(--text-faint)">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`cursor-pointer px-2 py-1 transition-colors ${locale === 'en' ? 'text-gold' : 'text-(--text-subtle)'}`}
      >
        EN
      </button>
    </div>
  )
}
