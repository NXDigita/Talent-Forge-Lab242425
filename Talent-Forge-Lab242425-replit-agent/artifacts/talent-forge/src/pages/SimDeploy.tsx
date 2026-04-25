import { Link } from "wouter";
import { useState } from "react";
import { runs } from "@/data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Search, GitBranch, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const filters = ["All", "PASS", "FAIL", "WARN", "RUNNING", "QUEUED"] as const;

export function SimDeploy() {
  const [filter, setFilter] = useState<typeof filters[number]>("All");
  const [q, setQ] = useState("");
  const filtered = runs.filter(r => (filter === "All" || r.status === filter) && (r.repo.includes(q.toLowerCase()) || r.id.includes(q.toLowerCase())));
  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">SimDeploy</h1>
        <p className="text-muted-foreground text-sm mt-1">Continuous SPICE pipeline · {runs.length} total runs</p>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder="Search runs by repo or id..."
            className="w-full bg-card border border-border rounded-md pl-9 pr-3 h-9 text-sm focus:outline-none focus:border-[#58A6FF]/60"
          />
        </div>
        <div className="flex items-center gap-1 bg-card border border-border rounded-md p-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-3 h-7 text-xs font-mono uppercase tracking-wider rounded-sm",
                filter === f ? "bg-[#58A6FF]/15 text-[#58A6FF]" : "text-muted-foreground hover:text-foreground"
              )}
            >{f}</button>
          ))}
        </div>
      </div>

      <div className="rounded-md bg-card border border-border overflow-hidden">
        <div className="grid grid-cols-[120px_1fr_140px_100px_70px_120px_80px] gap-4 px-4 h-10 items-center border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <div>Run</div>
          <div>Source</div>
          <div>Commit</div>
          <div>Duration</div>
          <div>Score</div>
          <div>Status</div>
          <div>Time</div>
        </div>
        <div className="divide-y divide-border">
          {filtered.map(r => (
            <Link key={r.id} href={`/simdeploy/${r.id}`}>
              <div className="grid grid-cols-[120px_1fr_140px_100px_70px_120px_80px] gap-4 px-4 py-3 items-center hover:bg-[#0d1117] cursor-pointer text-sm">
                <code className="text-[11px] font-mono text-[#58A6FF] truncate">{r.id}</code>
                <div className="min-w-0">
                  <div className="font-medium truncate">{r.repo}</div>
                  <div className="text-[11px] text-muted-foreground flex items-center gap-1 truncate">
                    <GitBranch className="size-3" />{r.branch}
                  </div>
                </div>
                <code className="text-[11px] font-mono text-muted-foreground truncate">{r.commit}</code>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="size-3" />{r.duration}</span>
                <span className={cn("font-mono text-sm font-semibold",
                  r.status === "PASS" && "text-[#3FB950]",
                  r.status === "FAIL" && "text-[#F85149]",
                  r.status === "WARN" && "text-[#F0B429]",
                  (r.status === "RUNNING" || r.status === "QUEUED") && "text-muted-foreground"
                )}>{r.score || "—"}</span>
                <StatusBadge status={r.status} />
                <span className="text-xs text-muted-foreground">{r.time}</span>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && <div className="p-8 text-center text-sm text-muted-foreground">No runs match.</div>}
        </div>
      </div>
    </div>
  );
}
