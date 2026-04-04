'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1400)
    const hideTimer = setTimeout(() => setVisible(false), 1900)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#111]"
      style={{
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/images/logo-loader.avif"
          alt="BuildX"
          width={160}
          height={60}
          priority
          style={{ filter: 'brightness(0) invert(1)' }}
        />
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-gold h-2 w-2 rounded-full"
              style={{
                animation: `bxBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
      <style>{`
        @keyframes bxBounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
