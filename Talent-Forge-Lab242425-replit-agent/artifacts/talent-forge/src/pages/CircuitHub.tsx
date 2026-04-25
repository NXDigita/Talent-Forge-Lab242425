import { Link } from "wouter";
import { Search, Star, GitFork, BookOpen, MapPin } from "lucide-react";
import { useState } from "react";
import { user, repos } from "@/data";
import { ContributionHeatmap } from "@/components/common/ContributionHeatmap";
import { StatusBadge } from "@/components/common/StatusBadge";
import { heatmap } from "@/data";

const langColors: Record<string,string> = {
  SPICE: "#39D0D8", "Verilog-A": "#F0B429", Verilog: "#3FB950", VHDL: "#A371F7", C: "#58A6FF",
};

export function CircuitHub() {
  const [q, setQ] = useState("");
  const filtered = repos.filter(r => r.name.includes(q.toLowerCase()) || r.desc.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="p-6 md:p-8 max-w-7xl">
      {/* Profile */}
      <div className="flex items-start gap-6 mb-8 flex-wrap">
        <div className="size-24 rounded-md bg-gradient-to-br from-[#58A6FF]/30 to-[#39D0D8]/30 border border-border flex items-center justify-center text-3xl font-mono font-semibold text-[#58A6FF]">
          {user.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-semibold">{user.name}</h1>
          <div className="text-muted-foreground">@{user.handle}</div>
          <div className="text-sm mt-2 max-w-xl">{user.bio}</div>
          <div className="flex items-center gap-4 mt-3 text-xs font-mono text-muted-foreground">
            <span className="flex items-center gap-1"><MapPin className="size-3" />{user.location}</span>
            <span>· {repos.length} repositories</span>
            <span>· {user.sims} simulations</span>
          </div>
        </div>
      </div>

      {/* Heatmap */}
      <div className="rounded-md bg-card border border-border p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">{364} contributions in the last year</h2>
          <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
            Less
            {[0,1,2,3,4].map(i => (
              <span key={i} className="size-2.5 rounded-sm" style={{ background: ["#161B22","#0e4429","#006d32","#26a641","#39d353"][i] }} />
            ))}
            More
          </div>
        </div>
        <ContributionHeatmap data={heatmap} />
      </div>

      {/* Search + Repos */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          value={q} onChange={e => setQ(e.target.value)}
          placeholder="Find a repository..."
          className="w-full bg-card border border-border rounded-md pl-10 pr-3 h-10 text-sm focus:outline-none focus:border-[#58A6FF]/60"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(r => (
          <Link key={r.id} href={`/circuithub/${r.id}`}>
            <div className="p-5 rounded-md bg-card border border-border hover:border-[#58A6FF]/50 transition-colors cursor-pointer h-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2 text-[#58A6FF] font-semibold">
                  <BookOpen className="size-4" />
                  <span className="hover:underline">{r.name}</span>
                </div>
                <StatusBadge status={r.lastSim} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{r.desc}</p>
              <div className="flex items-center gap-5 mt-4 text-xs font-mono text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="size-2.5 rounded-full" style={{ background: langColors[r.language] ?? "#8B949E" }} />{r.language}</span>
                <span className="flex items-center gap-1"><Star className="size-3" />{r.stars}</span>
                <span className="flex items-center gap-1"><GitFork className="size-3" />{r.forks}</span>
                <span>updated {r.updated}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
