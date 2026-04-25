import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CountdownTimer({ deadline, className }: { deadline: Date; className?: string }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const ms = Math.max(0, deadline.getTime() - now);
  const d = Math.floor(ms / 86400000);
  const h = Math.floor((ms % 86400000) / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  const urgent = ms < 3600000;
  return (
    <span className={cn("font-mono text-xs tabular-nums", urgent ? "text-[#F85149]" : "text-muted-foreground", className)}>
      {d > 0 && `${d}d `}{String(h).padStart(2,"0")}:{String(m).padStart(2,"0")}:{String(s).padStart(2,"0")}
    </span>
  );
}
