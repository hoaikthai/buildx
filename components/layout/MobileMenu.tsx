'use client';
import {useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {LanguageSwitcher} from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navItems: {label: string; onClick: () => void}[];
}

export function MobileMenu({open, onClose, navItems}: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {document.body.style.overflow = ''};
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          transition={{duration: 0.3}}
          className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg-primary)]"
        >
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="text-4xl leading-none cursor-pointer transition-colors hover:text-gold text-[var(--text-muted)]"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {navItems.map(({label, onClick}, i) => (
              <motion.button
                key={label}
                onClick={() => { onClick(); onClose(); }}
                initial={{opacity: 0, x: -20}}
                animate={{opacity: 1, x: 0}}
                transition={{delay: i * 0.07}}
                className="text-2xl font-bold tracking-widest uppercase hover:text-gold transition-colors cursor-pointer bg-transparent border-none text-[var(--text-primary)]"
              >
                {label}
              </motion.button>
            ))}
          </nav>

          <div className="flex justify-center pb-10">
            <LanguageSwitcher />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
