'use client'
import { Image } from '@/components/ui/Image'
import { motion } from 'framer-motion'

interface NewsCardProps {
  title: string
  excerpt: string
  image: string
  readMore: string
  index: number
}

export function NewsCard({
  title,
  excerpt,
  image,
  readMore,
  index,
}: NewsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group cursor-default overflow-hidden border border-[var(--border)] bg-[var(--bg-card)]"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
    >
      <div className="relative h-52 overflow-hidden">
        <Image
          src={`/images/${image}`}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-3 line-clamp-2 text-base leading-snug font-bold text-(--text-primary)">
          {title}
        </h3>
        <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-(--text-muted)">
          {excerpt}
        </p>
        <span className="text-gold text-xs font-bold tracking-wider uppercase transition-colors hover:text-(--text-primary)">
          {readMore} →
        </span>
      </div>
    </motion.div>
  )
}
