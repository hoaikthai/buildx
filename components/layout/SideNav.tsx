'use client';
import {useState, useEffect} from 'react';

const SECTIONS = [
  {id: 'about', num: '1'},
  {id: 'bim', num: '2'},
  {id: 'design', num: '3'},
  {id: 'construction', num: '4'},
  {id: 'pricing', num: '5'},
  {id: 'news', num: '6'},
  {id: 'contact', num: '7'},
];

export default function SideNav() {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({id}) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        {threshold: 0.3}
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 items-center"
      style={{borderRadius: '999px', padding: '8px 4px'}}
    >
      {SECTIONS.map(({id, num}) => (
        <a
          key={id}
          href={`#${id}`}
          aria-label={`Go to section ${num}`}
          className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200"
          style={{
            width: '38px',
            height: '38px',
            background: active === id
              ? 'rgba(255, 184, 0, 0.95)'
              : 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: active === id
              ? '1px solid rgba(255, 184, 0, 0.55)'
              : '1px solid rgba(255,255,255,0.15)',
            color: active === id ? '#111' : 'rgba(255,255,255,0.7)',
            boxShadow: active === id
              ? '0 8px 32px rgba(255,184,0,0.3)'
              : '0 2px 12px rgba(0,0,0,0.3)',
            transform: active === id ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {num}
        </a>
      ))}
    </nav>
  );
}
