import { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { ShieldCheck, Award, TrendingUp, Cpu, Search } from "lucide-react";
import { user, trend, skills, domainBreakdown, credentials } from "@/data";
import { toast } from "sonner";

export function SkillEdge() {
  const [hash, setHash] = useState("0x4a7c8e9f1b2d3c4e5f6a7b8c9d0e1f2a");
  const [verified, setVerified] = useState(true);

  const verify = () => {
    setVerified(true);
    toast.success("Credential verified — sealed by oracle node 0x12…ab");
  };

  const stats = [
    { label: "TFES", value: user.tfes.toLocaleString(), color: "#58A6FF" },
    { label: "Simulations", value: user.sims, color: "#3FB950" },
    { label: "Credentials", value: user.badges, color: "#F0B429" },
    { label: "Percentile", value: `${user.percentile}%`, color: "#39D0D8" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">SkillEdge</h1>
        <p className="text-muted-foreground text-sm mt-1">Verified analytics · fraud-proof credentials</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(s => (
          <div key={s.label} className="p-4 rounded-md bg-card border border-border">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
            <div className="text-3xl font-semibold font-mono mt-2" style={{ color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Trend */}
        <div className="rounded-md bg-card border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold flex items-center gap-2"><TrendingUp className="size-4 text-[#3FB950]" /> TFES trend · 12 weeks</h2>
            <span className="text-xs font-mono text-[#3FB950]">+22.1%</span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <LineChart data={trend}>
                <CartesianGrid stroke="#30363D" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="week" stroke="#8B949E" fontSize={11} />
                <YAxis stroke="#8B949E" fontSize={11} domain={["dataMin - 200", "dataMax + 200"]} />
                <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #30363D", borderRadius: 6, fontSize: 12 }} labelStyle={{ color: "#8B949E" }} />
                <Line type="monotone" dataKey="score" stroke="#58A6FF" strokeWidth={2} dot={{ r: 3, fill: "#58A6FF" }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar */}
        <div className="rounded-md bg-card border border-border p-5">
          <h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Cpu className="size-4 text-[#39D0D8]" /> Domain expertise</h2>
          <div style={{ height: 220 }}>
            <ResponsiveContainer>
              <RadarChart data={skills}>
                <PolarGrid stroke="#30363D" />
                <PolarAngleAxis dataKey="domain" stroke="#8B949E" fontSize={11} />
                <PolarRadiusAxis stroke="#30363D" tick={false} axisLine={false} domain={[0, 100]} />
                <Radar dataKey="value" stroke="#39D0D8" fill="#39D0D8" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="rounded-md bg-card border border-border mb-6 overflow-hidden">
        <div className="px-4 h-12 flex items-center border-b border-border">
          <h2 className="text-sm font-semibold">Domain breakdown</h2>
        </div>
        <div className="grid grid-cols-[1fr_70px_70px_70px_60px] gap-4 px-4 h-9 items-center text-[10px] font-mono uppercase tracking-wider text-muted-foreground border-b border-border">
          <div>Domain</div><div>Sims</div><div>Avg</div><div>Best</div><div>Trend</div>
        </div>
        {domainBreakdown.map(d => (
          <div key={d.domain} className="grid grid-cols-[1fr_70px_70px_70px_60px] gap-4 px-4 py-3 items-center text-sm border-b border-border last:border-b-0">
            <div className="font-medium">{d.domain}</div>
            <div className="font-mono text-muted-foreground">{d.sims}</div>
            <div className="font-mono">{d.avg}</div>
            <div className="font-mono text-[#3FB950]">{d.best}</div>
            <div className={d.trend > 0 ? "text-[#3FB950]" : d.trend < 0 ? "text-[#F85149]" : "text-muted-foreground"}>
              {d.trend > 0 ? "↑" : d.trend < 0 ? "↓" : "—"} {Math.abs(d.trend)}
            </div>
          </div>
        ))}
      </div>

      {/* Credential wall */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="size-4 text-[#F0B429]" /> Credential wall</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative p-5 rounded-md bg-card border border-border overflow-hidden bg-gradient-to-br ${c.gradient}`}
            >
              <div className="flex items-start justify-between mb-3 relative">
                <div className="size-10 rounded-md bg-[#0D1117]/70 border border-border flex items-center justify-center">
                  <Award className="size-4 text-[#39D0D8]" />
                </div>
                <span className="text-2xl font-mono font-semibold text-[#3FB950]">{c.score}</span>
              </div>
              <h3 className="font-semibold relative">{c.title}</h3>
              <code className="block text-[10px] font-mono text-muted-foreground mt-2 truncate relative">{c.hash}</code>
              <div className="text-[10px] font-mono text-muted-foreground mt-2 relative">Minted {c.date}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credential Shield */}
      <div className="rounded-md bg-card border border-border p-5">
        <h2 className="text-sm font-semibold flex items-center gap-2 mb-4"><ShieldCheck className="size-4 text-[#3FB950]" /> Credential Shield · employer verification</h2>
        <p className="text-xs text-muted-foreground mb-4">Paste any Talent Forge credential hash to verify authenticity, score, and origin.</p>
        <div className="flex gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              value={hash} onChange={e => { setHash(e.target.value); setVerified(false); }}
              className="w-full bg-[#0D1117] border border-border rounded-md pl-9 pr-3 h-10 text-sm font-mono focus:outline-none focus:border-[#58A6FF]/60"
            />
          </div>
          <button onClick={verify} className="bg-[#3FB950] text-black px-4 h-10 rounded-md text-sm font-medium hover:bg-[#3FB950]/90">
            Verify
          </button>
        </div>
        {verified && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-md bg-[#3FB950]/10 border border-[#3FB950]/30">
            <div className="flex items-center gap-2 text-[#3FB950] font-medium">
              <ShieldCheck className="size-4" /> Verified — credential is authentic
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3 text-xs font-mono">
              <div><span className="text-muted-foreground">Owner: </span>{user.name}</div>
              <div><span className="text-muted-foreground">Score: </span>98 / 100</div>
              <div><span className="text-muted-foreground">Issued: </span>Apr 23, 2026</div>
              <div><span className="text-muted-foreground">Oracle: </span>0x12…ab</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
