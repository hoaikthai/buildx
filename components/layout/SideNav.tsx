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

export function SideNav() {
  const [active, setActive] = useState<string>('home');
  const containerRef = useRef<Element | null>(null);

  useEffect(() => {
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
    <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-70 hidden xl:flex flex-col gap-2.5 items-center">
      {SECTIONS.map(({id, num}) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            aria-label={`Go to section ${num}`}
            className={`sidenav-dot ${isActive ? 'sidenav-dot--active' : ''} flex items-center justify-center rounded-full text-xs font-bold transition-all duration-200 cursor-pointer w-9 h-9`}
            style={{transform: isActive ? 'scale(1.12)' : 'scale(1)'}}
          >
            {num}
          </button>
        );
      })}
    </nav>
  );
}
