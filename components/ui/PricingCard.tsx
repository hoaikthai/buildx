interface PricingItem {
  name: string
  label: string
  price: string
  items: string[]
}

interface PricingCardProps {
  pkg: PricingItem
  unit: string
  includes: string
}

export function PricingCard({ pkg, unit, includes }: PricingCardProps) {
  return (
    <div className="bg-dark-2 w-75 flex-none rounded-2xl p-8 select-none md:w-90">
      <p className="text-gold mb-2 text-xs font-bold tracking-[3px] uppercase">
        {pkg.name}
      </p>
      <h3 className="mb-6 text-2xl font-bold text-white">{pkg.label}</h3>
      <div className="mb-6">
        <span className="text-gold text-4xl font-bold">{pkg.price}</span>
        <span className="ml-2 text-base text-white/40">{unit}</span>
      </div>
      <div className="pt-6">
        <p className="mb-4 text-sm tracking-wider text-white/40 uppercase">
          {includes}
        </p>
        <ul className="space-y-3">
          {pkg.items.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-base text-white/70"
            >
              <span className="text-gold mt-0.5 flex-none">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
