'use client';
import {motion} from 'framer-motion';

interface ServiceCardProps {
  name: string;
  description: string;
  index: number;
}

export default function ServiceCard({name, description, index}: ServiceCardProps) {
  return (
    <motion.div
      initial={{opacity: 0, y: 40}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.6, delay: index * 0.1}}
      className="group relative bg-[#1a1a1a] border border-white/10 p-8 hover:border-gold/50 transition-all duration-300 cursor-default"
    >
      <div className="w-8 h-0.5 bg-gold mb-6 group-hover:w-16 transition-all duration-300" />
      <h3 className="text-lg font-bold text-white mb-3">{name}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}
