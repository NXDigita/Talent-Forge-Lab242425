import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Stage { id: number; name: string }

export function PipelineStages({ stages, currentIndex, failed }: { stages: Stage[]; currentIndex: number; failed?: boolean }) {
  return (
    <div className="flex items-center gap-0 overflow-x-auto py-2">
      {stages.map((s, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        const failedHere = failed && active;
        return (
          <div key={s.id} className="flex items-center min-w-fit">
            <div className="flex flex-col items-center gap-2 px-2">
              <div className={cn(
                "size-9 rounded-full border flex items-center justify-center transition-colors",
                done && "bg-[#3FB950]/15 border-[#3FB950] text-[#3FB950]",
                active && !failedHere && "bg-[#58A6FF]/15 border-[#58A6FF] text-[#58A6FF]",
                failedHere && "bg-[#F85149]/15 border-[#F85149] text-[#F85149]",
                !done && !active && "bg-card border-border text-muted-foreground",
              )}>
                {done ? <Check className="size-4" /> :
                  active ? <Loader2 className="size-4 animate-spin" /> :
                  <Circle className="size-3" />}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wide text-center w-24 truncate">
                <span className={cn(
                  done && "text-[#3FB950]",
                  active && !failedHere && "text-[#58A6FF]",
                  failedHere && "text-[#F85149]",
                  !done && !active && "text-muted-foreground",
                )}>{s.name}</span>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className={cn("h-px w-12 -mt-6 flex-shrink-0",
                done ? "bg-[#3FB950]" : "bg-border"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
