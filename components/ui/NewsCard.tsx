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

export default function NewsCard({title, excerpt, image, readMore, index}: NewsCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6, delay: index * 0.1}}
      className="group bg-white overflow-hidden cursor-default border border-black/[0.08] shadow-sm"
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
        <h3 className="text-[#111] font-bold text-base leading-snug mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-black/60 text-sm leading-relaxed mb-4 line-clamp-3">
          {excerpt}
        </p>
        <span className="text-gold text-xs font-bold tracking-wider uppercase hover:text-white transition-colors">
          {readMore} →
        </span>
      </div>
    </motion.div>
  );
}
