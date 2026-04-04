'use client'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  navItems: { label: string; onClick: () => void }[]
}

export function MobileMenu({ open, onClose, navItems }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg-primary)]"
        >
          <div className="flex justify-end p-6">
            <button
              onClick={onClose}
              className="hover:text-gold cursor-pointer text-4xl leading-none text-(--text-muted) transition-colors"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navItems.map(({ label, onClick }, i) => (
              <motion.button
                key={label}
                onClick={() => {
                  onClick()
                  onClose()
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="hover:text-gold cursor-pointer border-none bg-transparent text-2xl font-bold tracking-widest text-(--text-primary) uppercase transition-colors"
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
  )
}
