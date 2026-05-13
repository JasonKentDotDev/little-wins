import { cn } from "@/lib/utils";

export function ProgressRing({ value, label, className }: { value: number; label: string; className?: string }) {
  const normalized = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("grid size-20 place-items-center rounded-full bg-white/70 p-1 shadow-inner dark:bg-white/10", className)}
      style={{ background: `conic-gradient(from 180deg, #22d3ee ${normalized}%, rgba(148,163,184,.2) 0)` }}
      aria-label={`${label}: ${Math.round(normalized)} percent`}
    >
      <div className="grid size-full place-items-center rounded-full bg-white/90 text-center dark:bg-slate-950/90">
        <span className="text-lg font-black text-slate-950 dark:text-white">{Math.round(normalized)}%</span>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
