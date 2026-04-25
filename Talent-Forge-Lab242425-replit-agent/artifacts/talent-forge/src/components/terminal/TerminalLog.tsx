import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

const TAG_COLORS: Record<string, string> = {
  init: "#8B949E",
  validate: "#58A6FF",
  spice: "#58A6FF",
  wave: "#58A6FF",
  check: "#58A6FF",
  score: "#58A6FF",
  mint: "#58A6FF",
  done: "#3FB950",
  PASS: "#3FB950",
  FAIL: "#F85149",
  WARN: "#F0B429",
};

function parseLine(line: string) {
  const stageHead = line.match(/^\[(\d+)\/\d+\]/);
  if (stageHead) {
    return (
      <span>
        <span className="text-[#39D0D8] font-bold">{line.split("]")[0]}]</span>
        <span className="text-foreground font-semibold">{line.split("]").slice(1).join("]")}</span>
      </span>
    );
  }
  const m = line.match(/^\[([a-zA-Z0-9_]+)\](.*)$/);
  if (m) {
    const tag = m[1];
    const color = TAG_COLORS[tag] ?? "#8B949E";
    let rest = m[2];
    let trail: React.ReactNode = null;
    const passMatch = rest.match(/(.*)\b(PASS|FAIL|WARN)\b\s*$/);
    if (passMatch) {
      const tColor = TAG_COLORS[passMatch[2]] ?? "#8B949E";
      rest = passMatch[1];
      trail = <span style={{ color: tColor }} className="font-bold">{passMatch[2]}</span>;
    }
    return (
      <span>
        <span style={{ color }}>[{tag}]</span>
        <span className="text-foreground/85">{rest}</span>
        {trail}
      </span>
    );
  }
  return <span className="text-foreground/85">{line}</span>;
}

export interface TerminalLogHandle { replay: () => void }

export function TerminalLog({
  lines,
  interval = 90,
  autoStart = true,
  className,
  onComplete,
  height = 360,
  prompt = "tf-runner",
}: {
  lines: string[];
  interval?: number;
  autoStart?: boolean;
  className?: string;
  onComplete?: () => void;
  height?: number | string;
  prompt?: string;
}) {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [running, setRunning] = useState(autoStart);
  const containerRef = useRef<HTMLDivElement>(null);
  const idxRef = useRef(0);

  const start = useCallback(() => {
    setDisplayed([]);
    idxRef.current = 0;
    setRunning(true);
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      const i = idxRef.current;
      if (i >= lines.length) {
        clearInterval(t);
        setRunning(false);
        onComplete?.();
        return;
      }
      setDisplayed(prev => [...prev, lines[i]]);
      idxRef.current = i + 1;
    }, interval);
    return () => clearInterval(t);
  }, [running, lines, interval, onComplete]);

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [displayed]);

  return (
    <div className={cn("relative", className)}>
      <div className="flex items-center justify-between px-3 py-2 bg-[#0a0d12] border border-border rounded-t-md border-b-0">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-[#F85149]/70" />
            <span className="size-2.5 rounded-full bg-[#F0B429]/70" />
            <span className="size-2.5 rounded-full bg-[#3FB950]/70" />
          </div>
          <span className="text-xs font-mono text-muted-foreground ml-2">{prompt} — build.log</span>
        </div>
        <button
          onClick={start}
          className="text-[11px] font-mono text-[#39D0D8] hover:text-[#58A6FF] transition-colors uppercase tracking-wider"
        >
          {running ? "running…" : "↻ replay"}
        </button>
      </div>
      <div
        ref={containerRef}
        className="bg-black border border-border border-l-2 border-l-[#39D0D8] rounded-b-md p-3 font-mono text-[12px] leading-relaxed overflow-y-auto"
        style={{ height }}
      >
        {displayed.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            <span className="text-[#39D0D8]/40 select-none mr-2">$</span>
            {parseLine(l)}
          </div>
        ))}
        {running && (
          <span className="inline-block w-2 h-4 bg-[#39D0D8] animate-pulse align-middle ml-1" />
        )}
      </div>
    </div>
  );
}
