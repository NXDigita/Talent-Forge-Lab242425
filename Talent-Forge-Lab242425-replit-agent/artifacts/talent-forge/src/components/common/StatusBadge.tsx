import { cn } from "@/lib/utils";

export type Status = "PASS" | "FAIL" | "WARN" | "RUNNING" | "QUEUED" | "READY" | "BUILDING";

const styles: Record<string, string> = {
  PASS:     "bg-[#3FB950]/15 text-[#3FB950] border-[#3FB950]/30",
  READY:    "bg-[#3FB950]/15 text-[#3FB950] border-[#3FB950]/30",
  FAIL:     "bg-[#F85149]/15 text-[#F85149] border-[#F85149]/30",
  WARN:     "bg-[#F0B429]/15 text-[#F0B429] border-[#F0B429]/30",
  RUNNING:  "bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/30",
  BUILDING: "bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/30",
  QUEUED:   "bg-muted/40 text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: Status | string; className?: string }) {
  const s = styles[status] ?? styles.QUEUED;
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-mono font-medium uppercase tracking-wide",
      s, className
    )}>
      {status === "RUNNING" || status === "BUILDING" ? (
        <span className="size-1.5 rounded-full bg-current animate-pulse" />
      ) : (
        <span className="size-1.5 rounded-full bg-current" />
      )}
      {status}
    </span>
  );
}
