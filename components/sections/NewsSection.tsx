import Image from 'next/image'
import { useTranslations } from 'next-intl'
import AnimatedText from '@/components/ui/AnimatedText'
import { NewsCard } from '@/components/ui/NewsCard'

export function NewsSection() {
  const t = useTranslations('news')
  const articles = t.raw('articles') as {
    title: string
    excerpt: string
    image: string
  }[]

  return (
    <section id="news" className="snap-section flex items-center">
      <Image
        src="/images/news-background.avif"
        alt=""
        fill
        className="object-cover"
      />
      <div className="relative mx-auto w-full max-w-7xl px-8 py-20 md:px-16">
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
