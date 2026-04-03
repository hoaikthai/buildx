'use client';
import {useState, useEffect} from 'react';

const SECTIONS = ['about', 'bim', 'design', 'construction', 'pricing', 'news', 'contact'];

export default function SideNav() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {threshold: 0.4}
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-4 items-center">
      {SECTIONS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className="group flex items-center gap-3"
          aria-label={`Go to section ${i + 1}`}
        >
          <span className={`text-[10px] font-bold transition-all duration-300 ${
            active === id ? 'text-[#FFB800] opacity-100' : 'text-white/0 group-hover:text-white/50'
          }`}>
            0{i + 1}
          </span>
          <span className={`block rounded-full transition-all duration-300 ${
            active === id
              ? 'w-2 h-2 bg-[#FFB800]'
              : 'w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70'
          }`} />
        </a>
      ))}
    </nav>
  );
}
