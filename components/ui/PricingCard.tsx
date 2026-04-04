interface PricingItem {
  name: string;
  label: string;
  price: string;
  items: string[];
}

interface PricingCardProps {
  pkg: PricingItem;
  unit: string;
  includes: string;
}

export function PricingCard({pkg, unit, includes}: PricingCardProps) {
  return (
    <div className="flex-none w-75 md:w-90 bg-dark-2 rounded-2xl p-8 select-none">
      <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-2">
        {pkg.name}
      </p>
      <h3 className="text-2xl font-bold text-white mb-6">{pkg.label}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold text-gold">{pkg.price}</span>
        <span className="text-white/40 text-base ml-2">{unit}</span>
      </div>
      <div className="pt-6">
        <p className="text-white/40 text-sm uppercase tracking-wider mb-4">{includes}</p>
        <ul className="space-y-3">
          {pkg.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-base text-white/70">
              <span className="text-gold mt-0.5 flex-none">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
