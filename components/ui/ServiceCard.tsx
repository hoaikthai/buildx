'use client'
import { motion } from 'framer-motion'

interface ServiceCardProps {
  name: string
  description: string
  index: number
}

export default function ServiceCard({
  name,
  description,
  index,
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-dark-2 hover:border-gold/50 relative cursor-default border border-white/10 p-8 transition-all duration-300"
    >
      <div className="bg-gold mb-6 h-0.5 w-8 transition-all duration-300 group-hover:w-16" />
      <h3 className="mb-3 text-lg font-bold text-white">{name}</h3>
      <p className="text-sm leading-relaxed text-white/60">{description}</p>
      <div className="bg-gold absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-500 group-hover:w-full" />
    </motion.div>
  )
}
