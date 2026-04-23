import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, GitBranch, Rocket, BarChart3, Zap, Radio, Battery, Wifi, Cog } from "lucide-react";
import { TerminalLog } from "@/components/terminal/TerminalLog";
import { leaderboard, categories } from "@/data";

const sampleLog = [
  "[init] talent-forge runner v2.4.1",
  "[validate] schematic OK — 142 nodes, 218 elements",
  "[spice] running transient analysis 50ns @ 1ps step",
  "[wave] FFT: f0 = 5.02 GHz, PN -118 dBc/Hz @ 1MHz",
  "[check] all thresholds met",
  "[score] correctness 100, performance 96, power 98",
  "[mint] credential 0x4a7c…e9f1 sealed",
  "[done] TFES +120 XP +480 — PASS",
];

const moduleCards = [
  { title: "CircuitHub", desc: "Version your designs. Branch, fork, and review schematics like code.", icon: GitBranch, href: "/circuithub", accent: "#58A6FF" },
  { title: "SimDeploy",  desc: "Continuous SPICE pipelines. Watch your circuits build, test, and ship.", icon: Rocket, href: "/simdeploy", accent: "#3FB950" },
  { title: "SkillEdge",  desc: "Verified analytics, fraud-proof credentials, employer-ready proof.",   icon: BarChart3, href: "/skilledge", accent: "#39D0D8" },
];

const catIcons: Record<string, React.ElementType> = {
  analog: Zap, digital: Cpu, power: Battery, rf: Wifi, embedded: Radio, control: Cog,
};

export function Landing() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-foreground overflow-x-hidden">
      {/* Top nav */}
      <header className="border-b border-border sticky top-0 z-30 backdrop-blur bg-[#0D1117]/80">
        <div className="max-w-7xl mx-auto h-14 px-6 flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer">
              <div className="size-8 rounded-md bg-gradient-to-br from-[#58A6FF] to-[#39D0D8] flex items-center justify-center shadow-[0_0_16px_rgba(88,166,255,0.4)]">
                <Cpu className="size-4 text-[#0D1117]" strokeWidth={2.5} />
              </div>
              <span className="font-semibold">Talent Forge</span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border rounded px-1.5 py-0.5">ECE Lab</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/circuithub"><span className="hover:text-foreground cursor-pointer">CircuitHub</span></Link>
            <Link href="/simdeploy"><span className="hover:text-foreground cursor-pointer">SimDeploy</span></Link>
            <Link href="/skilledge"><span className="hover:text-foreground cursor-pointer">SkillEdge</span></Link>
            <Link href="/leaderboard"><span className="hover:text-foreground cursor-pointer">Leaderboard</span></Link>
          </nav>
          <Link href="/dashboard">
            <button className="text-sm bg-[#3FB950] text-black px-3 h-8 rounded-md font-medium hover:bg-[#3FB950]/90 transition-colors">
              Launch app
            </button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 30% 30%, rgba(88,166,255,0.18), transparent 50%), radial-gradient(circle at 70% 50%, rgba(57,208,216,0.15), transparent 55%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 grid lg:grid-cols-2 gap-12 items-center relative">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-[#39D0D8] mb-6">
              <span className="size-1.5 rounded-full bg-[#39D0D8] animate-pulse" />
              ECE DevOps · v2.4.1 shipped
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight">
              Your ECE skills,<br/>
              <span className="bg-gradient-to-r from-[#58A6FF] via-[#39D0D8] to-[#3FB950] bg-clip-text text-transparent">verified by the machine.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Commit your circuits. Watch them simulate. Earn fraud-proof credentials.
              Talent Forge is GitHub + Vercel + a chip lab — for hardware engineers.
            </p>
            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <Link href="/dashboard">
                <button className="bg-[#3FB950] text-black px-5 h-11 rounded-md font-medium flex items-center gap-2 hover:bg-[#3FB950]/90 transition-colors shadow-[0_0_24px_rgba(63,185,80,0.3)]">
                  Start Simulating <ArrowRight className="size-4" />
                </button>
              </Link>
              <Link href="/simdeploy/run_8f4a1c">
                <button className="border border-border px-5 h-11 rounded-md font-medium hover:bg-card transition-colors">
                  Watch a live run
                </button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-xs font-mono text-muted-foreground">
              <div><span className="text-foreground text-lg font-semibold">42k+</span> engineers</div>
              <div><span className="text-foreground text-lg font-semibold">1.2M</span> simulations</div>
              <div><span className="text-foreground text-lg font-semibold">98k</span> credentials minted</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <TerminalLog lines={sampleLog} interval={220} height={340} prompt="alice-hw@forge" />
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <div className="text-xs font-mono uppercase tracking-widest text-[#58A6FF] mb-2">The platform</div>
          <h2 className="text-3xl font-bold">Three modules. One verified workflow.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {moduleCards.map((m, i) => (
            <Link key={m.title} href={m.href}>
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group p-6 rounded-md bg-card border border-border hover:border-[#58A6FF]/50 transition-all cursor-pointer h-full"
              >
                <div className="size-10 rounded-md flex items-center justify-center mb-4 border" style={{ background: `${m.accent}15`, borderColor: `${m.accent}40`, color: m.accent }}>
                  <m.icon className="size-5" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                <div className="mt-4 text-xs font-mono uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: m.accent }}>
                  Open module <ArrowRight className="size-3" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-16 border-t border-border">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-[#58A6FF] mb-2">Six domains</div>
            <h2 className="text-3xl font-bold">Pick your battle.</h2>
          </div>
          <Link href="/challenges"><span className="text-sm text-[#58A6FF] hover:underline cursor-pointer">All challenges →</span></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => {
            const Icon = catIcons[c.id];
            return (
              <Link key={c.id} href="/challenges">
                <div className="p-5 rounded-md bg-card border border-border hover:border-[#58A6FF]/50 transition-all cursor-pointer text-center">
                  <div className="size-10 mx-auto rounded-md flex items-center justify-center mb-3 border" style={{ background: `${c.color}15`, borderColor: `${c.color}40`, color: c.color }}>
                    <Icon className="size-5" />
                  </div>
                  <div className="font-medium text-sm">{c.name}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Leaderboard ticker */}
      <section className="border-y border-border bg-[#0a0d12] overflow-hidden py-4">
        <div className="flex items-center gap-3 px-6 max-w-7xl mx-auto">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#39D0D8] flex items-center gap-2 shrink-0">
            <span className="size-1.5 rounded-full bg-[#39D0D8] animate-pulse" /> Live · Top engineers
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex gap-8 animate-[tf-marquee_40s_linear_infinite] whitespace-nowrap">
              {[...leaderboard.slice(0, 15), ...leaderboard.slice(0, 15)].map((u, i) => (
                <div key={i} className="flex items-center gap-2 text-sm font-mono">
                  <span className="text-muted-foreground">#{u.rank}</span>
                  <span>{u.name}</span>
                  <span className="text-[#39D0D8]">{u.tfes.toLocaleString()} TFES</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@keyframes tf-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
      </section>

      <footer className="border-t border-border py-8 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs text-muted-foreground font-mono">
          <span>© 2026 Talent Forge — ECE Lab</span>
          <span>built with ngspice · verified on-chain</span>
        </div>
      </footer>
    </div>
  );
}
