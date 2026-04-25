import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Award, Cpu, Zap, ArrowRight, Plus } from "lucide-react";
import { user, runs, challenges } from "@/data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { Oscilloscope } from "@/components/oscilloscope/Oscilloscope";
import { toast } from "sonner";

function CountUp({ to, duration = 1.2 }: { to: number; duration?: number }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / (duration * 1000));
      setV(Math.round(to * (0.2 + 0.8 * (1 - Math.pow(1 - p, 3)))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setV(to);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, duration]);
  return <>{v.toLocaleString()}</>;
}

const stats = [
  { label: "TFES Score", icon: Activity, color: "#58A6FF", value: user.tfes, sub: `Rank #${user.rank} · top ${100 - user.percentile}%` },
  { label: "Total XP",   icon: Zap,      color: "#39D0D8", value: user.xp,   sub: "Lifetime" },
  { label: "Simulations",icon: Cpu,      color: "#3FB950", value: user.sims, sub: "92% pass rate" },
  { label: "Credentials",icon: Award,    color: "#F0B429", value: user.badges,sub: "On-chain verified" },
];

export function Dashboard() {
  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-1">Welcome back</div>
          <h1 className="text-3xl font-bold">{user.name.split(" ")[0]} — your forge</h1>
        </div>
        <button
          onClick={() => toast.success("New simulation queued for SimDeploy")}
          className="bg-[#3FB950] text-black px-4 h-9 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-[#3FB950]/90 transition-colors"
        >
          <Plus className="size-4" /> New simulation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            className="p-4 rounded-md bg-card border border-border"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-3xl font-semibold mt-2 font-mono"><CountUp to={s.value} /></div>
              </div>
              <div className="size-9 rounded-md flex items-center justify-center border" style={{ background: `${s.color}15`, borderColor: `${s.color}40`, color: s.color }}>
                <s.icon className="size-4" />
              </div>
            </div>
            <div className="text-[11px] text-muted-foreground mt-2">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent runs */}
        <div className="lg:col-span-2 rounded-md bg-card border border-border">
          <div className="px-4 h-12 flex items-center justify-between border-b border-border">
            <h2 className="font-semibold text-sm">Recent simulations</h2>
            <Link href="/simdeploy"><span className="text-xs text-[#58A6FF] hover:underline cursor-pointer">View all →</span></Link>
          </div>
          <div className="divide-y divide-border">
            {runs.slice(0, 6).map(r => (
              <Link key={r.id} href={`/simdeploy/${r.id}`}>
                <div className="px-4 py-3 hover:bg-[#0d1117] cursor-pointer flex items-center gap-4">
                  <StatusBadge status={r.status} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.repo}</div>
                    <div className="text-[11px] font-mono text-muted-foreground truncate">
                      {r.branch} · {r.commit} · {r.time}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-semibold" style={{ color: r.status === "PASS" ? "#3FB950" : r.status === "FAIL" ? "#F85149" : r.status === "WARN" ? "#F0B429" : "#8B949E" }}>
                      {r.status === "QUEUED" || r.status === "RUNNING" ? "—" : r.score}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{r.duration}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Side */}
        <div className="space-y-6">
          <div className="rounded-md bg-card border border-border">
            <div className="px-4 h-12 flex items-center justify-between border-b border-border">
              <h2 className="font-semibold text-sm">Live capture</h2>
              <span className="text-[10px] font-mono text-[#39D0D8]">v(out1) · 5.02 GHz</span>
            </div>
            <div className="p-3">
              <Oscilloscope wave="composite" height={140} />
            </div>
          </div>

          <div className="rounded-md bg-card border border-border">
            <div className="px-4 h-12 flex items-center justify-between border-b border-border">
              <h2 className="font-semibold text-sm">Active challenges</h2>
              <Link href="/challenges"><ArrowRight className="size-4 text-muted-foreground hover:text-foreground cursor-pointer" /></Link>
            </div>
            <div className="divide-y divide-border">
              {challenges.slice(0, 3).map(c => (
                <Link key={c.id} href={`/challenges/${c.id}`}>
                  <div className="px-4 py-3 hover:bg-[#0d1117] cursor-pointer">
                    <div className="text-sm font-medium">{c.title}</div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[11px] text-[#F0B429] font-mono">{c.points} pts</span>
                      <CountdownTimer deadline={new Date(Date.now() + c.deadlineHours * 3600000)} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
