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

export default function PricingCard({pkg, unit, includes}: PricingCardProps) {
  return (
    <div className="flex-none w-[300px] md:w-[360px] bg-[#1a1a1a] border border-white/10 p-8 select-none">
      <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-2">
        {pkg.name}
      </p>
      <h3 className="text-xl font-bold text-white mb-6">{pkg.label}</h3>
      <div className="mb-6">
        <span className="text-3xl font-bold text-gold">{pkg.price}</span>
        <span className="text-white/40 text-sm ml-2">{unit}</span>
      </div>
      <div className="border-t border-white/10 pt-6">
        <p className="text-white/40 text-xs uppercase tracking-wider mb-4">{includes}</p>
        <ul className="space-y-3">
          {pkg.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-white/70">
              <span className="text-gold mt-0.5 flex-none">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
