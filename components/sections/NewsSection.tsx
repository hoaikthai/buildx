import { Image } from '@/components/ui/Image'
import { useTranslations } from 'next-intl'
import { AnimatedText } from '@/components/ui/AnimatedText'
import { NewsCard } from '@/components/ui/NewsCard'

export function NewsSection() {
  const t = useTranslations('news')
  const articles = t.raw('articles') as {
    title: string
    excerpt: string
    image: string
  }[]

  return (
    <section id="news" className="snap-section flex flex-col justify-center">
      <Image
        src="/images/news-background.avif"
        alt=""
        fill
        className="object-cover dark:hidden"
      />
      <Image
        src="/images/news-background-dark.avif"
        alt=""
        fill
        className="hidden object-cover dark:block"
      />
      <div className="relative mx-auto w-full max-w-7xl px-8 pt-10 pb-4 md:px-16 md:pt-20">
        <AnimatedText>
          <p className="text-gold mb-4 text-xs font-bold tracking-[5px]">
            NEWS
          </p>
          <h2
            className="mb-4 leading-none font-bold text-(--text-primary)"
            style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)' }}
          >
            {t('title')}
          </h2>
          <div className="bg-gold mb-6 md:mb-12 h-px w-12" />
        </AnimatedText>
      </div>

      <div className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-8 pb-8 scroll-pl-8 md:mx-auto md:grid md:w-full md:max-w-7xl md:grid-cols-2 md:overflow-visible md:px-16 md:pb-20 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden">
        {articles.map((article, i) => (
          <div key={i} className="w-[85vw] shrink-0 snap-start md:w-auto md:shrink">
            <NewsCard
              title={article.title}
              excerpt={article.excerpt}
              image={article.image}
              readMore={t('read_more')}
              index={i}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
