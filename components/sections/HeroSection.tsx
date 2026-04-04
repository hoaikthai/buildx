import Image from 'next/image'

export default function HeroSection() {
  return (
    <section id="home" className="snap-section z-60">
      <Image
        src="/images/hero-bg.avif"
        alt="BuildX"
        fill
        priority
        className="object-cover"
      />
      {/* Subtle dark vignette so logo stays readable */}
      {/* <div
        className="absolute inset-0 pointer-events-none"
        style={{background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%)'}}
      /> */}
    </section>
  )
}
