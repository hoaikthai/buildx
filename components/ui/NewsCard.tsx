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

export function NewsCard({title, excerpt, image, readMore, index}: NewsCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6, delay: index * 0.1}}
      className="group overflow-hidden cursor-default bg-[var(--bg-card)] border border-[var(--border)]"
      style={{boxShadow: '0 1px 4px rgba(0,0,0,0.06)'}}
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
        <h3 className="font-bold text-base leading-snug mb-3 line-clamp-2 text-[var(--text-primary)]">
          {title}
        </h3>
        <p className="text-sm leading-relaxed mb-4 line-clamp-3 text-[var(--text-muted)]">
          {excerpt}
        </p>
        <span className="text-gold text-xs font-bold tracking-wider uppercase hover:text-[var(--text-primary)] transition-colors">
          {readMore} →
        </span>
      </div>
    </motion.div>
  );
}
