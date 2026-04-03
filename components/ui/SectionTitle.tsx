interface SectionTitleProps {
  label?: string;
  title: string;
  className?: string;
}

export default function SectionTitle({label, title, className = ''}: SectionTitleProps) {
  return (
    <div className={`mb-12 ${className}`}>
      {label && (
        <p className="text-[#FFB800] text-xs font-bold tracking-[4px] uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
        {title}
      </h2>
      <div className="mt-4 w-12 h-0.5 bg-[#FFB800]" />
    </div>
  );
}
