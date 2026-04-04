'use client'
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedTextProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function AnimatedText({
  children,
  delay = 0,
  className = '',
}: AnimatedTextProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
