import { motion } from "framer-motion";

export function ScoreBar({ label, score, max = 100, color = "#58A6FF", delay = 0 }: {
  label: string; score: number; max?: number; color?: string; delay?: number;
}) {
  const pct = Math.max(0, Math.min(100, (score / max) * 100));
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{score}<span className="text-muted-foreground">/{max}</span></span>
      </div>
      <div className="h-1.5 w-full bg-[#0D1117] rounded-full overflow-hidden border border-border">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color, boxShadow: `0 0 12px ${color}66` }}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}
