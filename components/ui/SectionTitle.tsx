interface SectionTitleProps {
  label?: string
  title: string
  className?: string
}

export default function SectionTitle({
  label,
  title,
  className = '',
}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <p className="text-gold mb-3 text-xs font-bold tracking-[4px] uppercase">
          {label}
        </p>
      )}
      <h2 className="text-3xl leading-tight font-bold text-white md:text-4xl">
        {title}
      </h2>
      <div className="bg-gold mt-4 h-0.5 w-12" />
    </div>
  )
}
