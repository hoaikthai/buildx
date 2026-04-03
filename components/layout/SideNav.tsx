'use client';
import {useState, useEffect, useRef} from 'react';

const SECTIONS = [
  {id: 'home', num: '1'},
  {id: 'about', num: '2'},
  {id: 'bim', num: '3'},
  {id: 'design', num: '4'},
  {id: 'construction', num: '5'},
  {id: 'pricing', num: '6'},
  {id: 'news', num: '7'},
  {id: 'contact', num: '8'},
];

export default function SideNav() {
  const [active, setActive] = useState<string>('home');
  const containerRef = useRef<Element | null>(null);

  useEffect(() => {
    // Find the snap container
    containerRef.current = document.querySelector('.snap-container');
    const container = containerRef.current;
    if (!container) return;

    function onScroll() {
      const dvh = window.innerHeight;
      const scrollTop = container!.scrollTop;
      const index = Math.round(scrollTop / dvh);
      const section = SECTIONS[Math.min(index, SECTIONS.length - 1)];
      if (section) setActive(section.id);
    }

    container.addEventListener('scroll', onScroll, {passive: true});
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  function scrollTo(id: string) {
    const container = containerRef.current;
    if (!container) return;
    const idx = SECTIONS.findIndex((s) => s.id === id);
    container.scrollTo({top: idx * window.innerHeight, behavior: 'smooth'});
  }

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-2.5 items-center"
    >
      {SECTIONS.map(({id, num}) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to section ${num}`}
            className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200 cursor-pointer"
            style={{
              width: '36px',
              height: '36px',
              background: isActive ? 'rgba(255,184,0,0.95)' : 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: isActive ? '1px solid rgba(255,184,0,0.5)' : '1px solid rgba(255,255,255,0.18)',
              color: isActive ? '#111' : 'rgba(255,255,255,0.75)',
              boxShadow: isActive ? '0 8px 28px rgba(255,184,0,0.35)' : '0 2px 10px rgba(0,0,0,0.4)',
              transform: isActive ? 'scale(1.12)' : 'scale(1)',
            }}
          >
            {num}
          </button>
        );
      })}
    </nav>
  );
}
