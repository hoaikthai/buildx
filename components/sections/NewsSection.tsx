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
