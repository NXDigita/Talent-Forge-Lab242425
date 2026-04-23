import { Link, useRoute } from "wouter";
import { useState } from "react";
import { ArrowLeft, FileCode, FileText, Activity, GitCommit, History, BookOpen } from "lucide-react";
import { repos, filesByRepo, commits, runs } from "@/data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { cn } from "@/lib/utils";

const fileIcon = (t: string) => t === "md" ? FileText : t === "vcd" ? Activity : FileCode;

export function CircuitHubRepo() {
  const [, params] = useRoute("/circuithub/:repoId");
  const repoId = params?.repoId ?? "repo_1";
  const repo = repos.find(r => r.id === repoId) ?? repos[0];
  const files = filesByRepo[repo.id] ?? filesByRepo.repo_1;
  const [tab, setTab] = useState<"files" | "commits" | "sims">("files");
  const [selected, setSelected] = useState(files[0].name);
  const file = files.find(f => f.name === selected) ?? files[0];
  const repoRuns = runs.filter(r => r.repo === repo.name);

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <Link href="/circuithub">
        <span className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer mb-4">
          <ArrowLeft className="size-3" /> All repositories
        </span>
      </Link>
      <div className="flex items-start justify-between gap-3 flex-wrap mb-2">
        <h1 className="text-2xl font-semibold flex items-center gap-2">
          <BookOpen className="size-5 text-muted-foreground" />
          <span className="text-[#58A6FF]">{repo.name}</span>
        </h1>
        <StatusBadge status={repo.lastSim} />
      </div>
      <p className="text-muted-foreground mb-6">{repo.desc}</p>

      <div className="border-b border-border flex items-center gap-1 mb-6">
        {([["files","Files",FileCode],["commits","Commits",GitCommit],["sims","Simulations",History]] as const).map(([k, lbl, Icon]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={cn(
              "px-4 h-10 text-sm flex items-center gap-2 border-b-2 -mb-px transition-colors",
              tab === k ? "border-[#F0B429] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="size-4" />{lbl}
          </button>
        ))}
      </div>

      {tab === "files" && (
        <div className="grid md:grid-cols-[260px_1fr] gap-4">
          <div className="rounded-md bg-card border border-border p-2 h-fit">
            {files.map(f => {
              const Icon = fileIcon(f.type);
              return (
                <button
                  key={f.name}
                  onClick={() => setSelected(f.name)}
                  className={cn(
                    "w-full flex items-center gap-2 px-2 h-8 rounded-sm text-sm text-left hover:bg-[#0d1117]",
                    selected === f.name && "bg-[#58A6FF]/10 text-[#58A6FF]"
                  )}
                >
                  <Icon className="size-3.5" />{f.name}
                </button>
              );
            })}
          </div>
          <div className="rounded-md bg-card border border-border overflow-hidden">
            <div className="px-3 h-9 border-b border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
              <span>{file.name}</span>
              <span>{file.content.split("\n").length} lines</span>
            </div>
            <pre className="p-4 font-mono text-[12px] leading-relaxed text-foreground/85 whitespace-pre overflow-x-auto bg-[#0a0d12]">
              {file.content.split("\n").map((line, i) => (
                <div key={i} className="flex">
                  <span className="text-muted-foreground/50 select-none mr-4 w-6 text-right">{i + 1}</span>
                  <span>{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}

      {tab === "commits" && (
        <div className="rounded-md bg-card border border-border divide-y divide-border">
          {commits.map(c => (
            <div key={c.hash} className="p-4 flex items-center gap-4">
              <GitCommit className="size-4 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">{c.message}</div>
                <div className="text-[11px] font-mono text-muted-foreground">{c.author} · {c.date}</div>
              </div>
              <code className="text-[11px] font-mono text-[#58A6FF] bg-[#58A6FF]/10 border border-[#58A6FF]/20 rounded px-2 py-1">{c.hash}</code>
            </div>
          ))}
        </div>
      )}

      {tab === "sims" && (
        <div className="rounded-md bg-card border border-border divide-y divide-border">
          {repoRuns.length === 0 && <div className="p-6 text-sm text-muted-foreground text-center">No simulations for this repo yet.</div>}
          {repoRuns.map(r => (
            <Link key={r.id} href={`/simdeploy/${r.id}`}>
              <div className="p-4 flex items-center gap-4 hover:bg-[#0d1117] cursor-pointer">
                <StatusBadge status={r.status} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono">{r.id}</div>
                  <div className="text-[11px] text-muted-foreground">{r.branch} · {r.commit} · {r.time}</div>
                </div>
                <div className="text-sm font-mono">{r.score || "—"}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
