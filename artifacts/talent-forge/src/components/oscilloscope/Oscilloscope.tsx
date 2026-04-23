import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

export type Wave = "sine" | "square" | "composite" | "damped";

function pointsFor(wave: Wave, w: number, h: number, samples = 240) {
  const mid = h / 2;
  const amp = h * 0.32;
  const points: string[] = [];
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * w;
    const t = (i / samples) * Math.PI * 6;
    let y = 0;
    if (wave === "sine") y = Math.sin(t);
    else if (wave === "square") y = Math.sign(Math.sin(t));
    else if (wave === "damped") y = Math.sin(t * 1.4) * Math.exp(-i / samples * 1.6);
    else y = Math.sin(t) * 0.7 + Math.sin(t * 3.1) * 0.18 + Math.sin(t * 5.3) * 0.08;
    points.push(`${x.toFixed(1)},${(mid - y * amp).toFixed(1)}`);
  }
  return points.join(" ");
}

export function Oscilloscope({
  wave = "composite",
  color = "#39D0D8",
  height = 220,
  className,
  label = "v(out1)",
}: {
  wave?: Wave;
  color?: string;
  height?: number;
  className?: string;
  label?: string;
}) {
  const id = useId();
  const w = 800;
  const h = height;
  const path = useMemo(() => pointsFor(wave, w, h), [wave, h]);
  const grid = 10;
  return (
    <div className={cn("relative w-full overflow-hidden rounded-md border border-border bg-black", className)} style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <defs>
          <pattern id={`grid-${id}`} width={w / grid} height={h / 8} patternUnits="userSpaceOnUse">
            <path d={`M ${w/grid} 0 L 0 0 0 ${h/8}`} fill="none" stroke="#1a2230" strokeWidth="0.5" />
          </pattern>
          <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.4" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width={w} height={h} fill={`url(#grid-${id})`} />
        {/* center lines */}
        <line x1="0" y1={h/2} x2={w} y2={h/2} stroke="#30363D" strokeDasharray="2 4" strokeWidth="0.6" />
        <line x1={w/2} y1="0" x2={w/2} y2={h} stroke="#30363D" strokeDasharray="2 4" strokeWidth="0.6" />
        {/* waveform area */}
        <polyline
          points={`0,${h} ${path} ${w},${h}`}
          fill={`url(#glow-${id})`}
        />
        {/* waveform stroke with draw animation */}
        <polyline
          points={path}
          fill="none"
          stroke={color}
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 4px ${color})`,
            strokeDasharray: 4000,
            strokeDashoffset: 4000,
            animation: "tf-draw 2.4s ease-out forwards, tf-shift 8s linear infinite 2.4s",
          }}
        />
      </svg>
      <div className="absolute top-2 left-3 text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex gap-4">
        <span><span style={{ color }}>●</span> {label}</span>
        <span>50ns/div</span>
        <span>500mV/div</span>
      </div>
      <div className="absolute bottom-2 right-3 text-[10px] font-mono text-muted-foreground">TRIG: AUTO</div>
      <style>{`
        @keyframes tf-draw { to { stroke-dashoffset: 0; } }
        @keyframes tf-shift { from { transform: translateX(0); } to { transform: translateX(-${w/3}px); } }
      `}</style>
    </div>
  );
}
