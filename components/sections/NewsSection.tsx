import {useTranslations} from 'next-intl';
import AnimatedText from '@/components/ui/AnimatedText';
import {NewsCard} from '@/components/ui/NewsCard';

export function NewsSection() {
  const t = useTranslations('news');
  const articles = t.raw('articles') as {
    title: string; excerpt: string; image: string;
  }[];

  return (
    <section id="news" className="snap-section flex items-center bg-[var(--bg-primary)]">
      <div className="w-full max-w-7xl mx-auto px-8 md:px-16 py-20">
        <AnimatedText>
          <p className="text-gold text-xs font-bold mb-4 tracking-[5px]">
            NEWS
          </p>
          <h2
            className="font-bold mb-4 leading-none text-[var(--text-primary)]"
            style={{fontSize: 'clamp(2.5rem, 4.5vw, 4rem)'}}
          >
            {t('title')}
          </h2>
          <div className="w-12 h-px bg-gold mb-12" />
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
