import type { LucideIcon } from 'lucide-react';

interface FlowerStatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  accent?: 'default' | 'warm' | 'green';
}

const ACCENT_STYLES = {
  default: 'bg-brand-cream/60 text-brand-brown',
  warm: 'bg-amber-50 text-amber-700',
  green: 'bg-emerald-50 text-emerald-700',
};

export default function FlowerStatCard({
  label,
  value,
  icon: Icon,
  accent = 'default',
}: FlowerStatCardProps) {
  return (
    <div className="flower-card flex min-w-0 flex-col gap-2.5 p-3.5 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11 ${ACCENT_STYLES[accent]}`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-brand-accent sm:text-xs">
          {label}
        </p>
        <p className="mt-0.5 font-serif text-[1.35rem] font-semibold leading-none tracking-tight text-brand-dark sm:text-2xl">
          {value}
        </p>
      </div>
    </div>
  );
}
