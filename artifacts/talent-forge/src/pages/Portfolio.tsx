import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Award, ShieldCheck, ExternalLink, Cpu } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from "recharts";
import { user, trend, skills, credentials, timeline, skillBars } from "@/data";
import { ContributionHeatmap } from "@/components/common/ContributionHeatmap";
import { heatmap } from "@/data";
import { toast } from "sonner";

export function Portfolio() {
  const [, params] = useRoute("/portfolio/:id");
  // Always use mock user; id is decorative.
  void params;

  return (
    <div className="min-h-screen bg-[#0D1117]">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <Link href="/">
            <span className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer">
              <ArrowLeft className="size-3" /> Talent Forge
            </span>
          </Link>
          <button onClick={() => toast.success("Portfolio link copied to clipboard")}
            className="text-xs border border-border h-8 px-3 rounded-md hover:bg-card flex items-center gap-1.5">
            <ExternalLink className="size-3" /> Share
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-6 mb-8 flex-wrap">
          <div className="size-28 rounded-md bg-gradient-to-br from-[#58A6FF]/30 to-[#39D0D8]/30 border border-border flex items-center justify-center text-4xl font-mono font-semibold text-[#58A6FF]">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <div className="text-muted-foreground">@{user.handle}</div>
            <p className="text-sm mt-2 max-w-xl">{user.bio}</p>
            <div className="flex items-center gap-4 mt-3 text-xs font-mono text-muted-foreground flex-wrap">
              <span className="flex items-center gap-1"><MapPin className="size-3" />{user.location}</span>
              <span>· Top {100 - user.percentile}% globally</span>
              <span className="flex items-center gap-1 text-[#3FB950]"><ShieldCheck className="size-3" />Verified by SkillEdge</span>
            </div>
          </div>
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: "TFES", value: user.tfes.toLocaleString(), color: "#58A6FF" },
            { label: "Simulations", value: user.sims, color: "#3FB950" },
            { label: "Credentials", value: user.badges, color: "#F0B429" },
            { label: "Rank", value: `#${user.rank}`, color: "#39D0D8" },
          ].map(s => (
            <div key={s.label} className="p-4 rounded-md bg-card border border-border">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{s.label}</div>
              <div className="text-2xl font-semibold font-mono mt-1" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5 mb-8">
          <div className="rounded-md bg-card border border-border p-5">
            <h2 className="text-sm font-semibold mb-3">TFES growth</h2>
            <div style={{ height: 200 }}>
              <ResponsiveContainer>
                <LineChart data={trend}>
                  <CartesianGrid stroke="#30363D" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="week" stroke="#8B949E" fontSize={11} />
                  <YAxis stroke="#8B949E" fontSize={11} domain={["dataMin - 100", "dataMax + 100"]} />
                  <Tooltip contentStyle={{ background: "#0d1117", border: "1px solid #30363D", borderRadius: 6, fontSize: 12 }} />
                  <Line type="monotone" dataKey="score" stroke="#58A6FF" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-md bg-card border border-border p-5">
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><Cpu className="size-4 text-[#39D0D8]" /> Skill matrix</h2>
            <div style={{ height: 200 }}>
              <ResponsiveContainer>
                <RadarChart data={skills}>
                  <PolarGrid stroke="#30363D" />
                  <PolarAngleAxis dataKey="domain" stroke="#8B949E" fontSize={11} />
                  <Radar dataKey="value" stroke="#39D0D8" fill="#39D0D8" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Skill bars */}
        <div className="rounded-md bg-card border border-border p-5 mb-8">
          <h2 className="text-sm font-semibold mb-4">Verified skills</h2>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
            {skillBars.map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{s.name}</span>
                  <span className="font-mono text-muted-foreground">{s.value}%</span>
                </div>
                <div className="h-1.5 bg-[#0D1117] rounded-full overflow-hidden border border-border">
                  <motion.div
                    initial={{ width: 0 }} whileInView={{ width: `${s.value}%` }} viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full bg-gradient-to-r from-[#58A6FF] to-[#39D0D8]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity heatmap */}
        <div className="rounded-md bg-card border border-border p-5 mb-8">
          <h2 className="text-sm font-semibold mb-3">Activity</h2>
          <ContributionHeatmap data={heatmap} />
        </div>

        {/* Credentials */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-3 flex items-center gap-2"><Award className="size-4 text-[#F0B429]" /> Credentials</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {credentials.slice(0, 6).map(c => (
              <div key={c.id} className={`p-4 rounded-md bg-card border border-border bg-gradient-to-br ${c.gradient}`}>
                <div className="flex items-center justify-between">
                  <Award className="size-5 text-[#39D0D8]" />
                  <span className="font-mono font-semibold text-[#3FB950]">{c.score}</span>
                </div>
                <div className="font-medium text-sm mt-2">{c.title}</div>
                <code className="text-[10px] font-mono text-muted-foreground block mt-1 truncate">{c.hash}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-8">
          <h2 className="text-sm font-semibold mb-4">Timeline</h2>
          <div className="space-y-3">
            {timeline.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="flex items-start gap-4">
                <div className="size-8 rounded-md bg-card border border-border flex items-center justify-center shrink-0">
                  <span className="size-2 rounded-full bg-[#58A6FF]" />
                </div>
                <div className="flex-1 p-3 rounded-md bg-card border border-border">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="text-sm font-medium">{t.event}</div>
                    <span className="text-[10px] font-mono text-muted-foreground">{t.date}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{t.detail}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
