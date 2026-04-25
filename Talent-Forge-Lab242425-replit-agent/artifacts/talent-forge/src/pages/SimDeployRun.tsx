import { Link, useRoute } from "wouter";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, GitBranch, GitCommit, Clock, RotateCw, Award, ExternalLink, ShieldCheck } from "lucide-react";
import { runs, stages, getBuildLog } from "@/data";
import { TerminalLog } from "@/components/terminal/TerminalLog";
import { Oscilloscope } from "@/components/oscilloscope/Oscilloscope";
import { PipelineStages } from "@/components/common/PipelineStages";
import { ScoreBar } from "@/components/common/ScoreBar";
import { StatusBadge } from "@/components/common/StatusBadge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function SimDeployRun() {
  const [, params] = useRoute("/simdeploy/:runId");
  const runId = params?.runId ?? "run_8f4a1c";
  const run = runs.find(r => r.id === runId) ?? runs[0];
  const score = run.score || 92;
  const lines = useMemo(() => getBuildLog(run.repo, score), [run.repo, score]);

  // Track current pipeline stage based on log progression (simulated)
  const [stageIdx, setStageIdx] = useState(0);
  useEffect(() => {
    setStageIdx(0);
    // 6 stages over ~ lines.length * 90ms
    const stageDuration = (lines.length * 90) / 6;
    const timeouts = stages.map((_, i) =>
      setTimeout(() => setStageIdx(i + 1), stageDuration * (i + 1))
    );
    return () => timeouts.forEach(clearTimeout);
  }, [lines]);

  const finalStatus = run.status;
  const subScores = [
    { label: "Correctness",       value: score === 0 ? 0 : Math.min(100, score + 5), color: "#3FB950" },
    { label: "Performance",       value: score === 0 ? 0 : score, color: "#58A6FF" },
    { label: "Power Efficiency",  value: score === 0 ? 0 : Math.max(50, score - 4), color: "#39D0D8" },
    { label: "Robustness",        value: score === 0 ? 0 : Math.max(50, score - 8), color: "#F0B429" },
  ];

  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <Link href="/simdeploy">
        <span className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer mb-4">
          <ArrowLeft className="size-3" /> All deployments
        </span>
      </Link>

      {/* Header */}
      <div className="rounded-md bg-card border border-border p-5 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <StatusBadge status={finalStatus} />
              <code className="text-sm font-mono text-[#58A6FF]">{run.id}</code>
            </div>
            <h1 className="text-2xl font-semibold mt-2">{run.repo}</h1>
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground mt-2 flex-wrap">
              <span className="flex items-center gap-1.5"><GitBranch className="size-3" />{run.branch}</span>
              <span className="flex items-center gap-1.5"><GitCommit className="size-3" />{run.commit}</span>
              <span className="flex items-center gap-1.5"><Clock className="size-3" />{run.duration}</span>
              <span>by {run.author}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Score</div>
              <div className={cn("text-4xl font-bold font-mono",
                finalStatus === "PASS" && "text-[#3FB950]",
                finalStatus === "FAIL" && "text-[#F85149]",
                finalStatus === "WARN" && "text-[#F0B429]",
                (finalStatus === "RUNNING" || finalStatus === "QUEUED") && "text-muted-foreground"
              )}>
                {score || "—"}
              </div>
            </div>
            <button
              onClick={() => { toast.success("Re-running simulation..."); setStageIdx(0); }}
              className="border border-border h-9 px-3 rounded-md text-sm flex items-center gap-2 hover:bg-[#0d1117] transition-colors"
            >
              <RotateCw className="size-4" /> Re-run
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline stages */}
      <div className="rounded-md bg-card border border-border p-5 mb-6">
        <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">Pipeline</div>
        <PipelineStages stages={stages} currentIndex={stageIdx} failed={finalStatus === "FAIL"} />
      </div>

      {/* Build log */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-[#39D0D8] animate-pulse" /> Build log
        </h2>
        <TerminalLog lines={lines} interval={90} height={420} prompt={`${run.author}@forge / ${run.repo}`} />
      </div>

      {/* Waveform */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Waveform output</h2>
          <span className="text-[10px] font-mono text-muted-foreground">v(out1) · 50ns window · 1ps step</span>
        </div>
        <Oscilloscope wave={finalStatus === "FAIL" ? "damped" : "composite"} height={260} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Score Report */}
        <div className="rounded-md bg-card border border-border p-5">
          <h2 className="text-sm font-semibold mb-4">Score report</h2>
          <div className="space-y-4">
            {subScores.map((s, i) => (
              <ScoreBar key={s.label} label={s.label} score={s.value} color={s.color} delay={i * 0.15} />
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">TFES delta</div>
              <div className="text-2xl font-semibold font-mono mt-1 text-[#3FB950]">+120</div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground text-right">XP awarded</div>
              <div className="text-2xl font-semibold font-mono mt-1 text-[#39D0D8] text-right">+480</div>
            </div>
          </div>
        </div>

        {/* Credential */}
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="rounded-md bg-card border border-border p-5 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 size-48 rounded-full bg-gradient-to-br from-[#58A6FF]/30 to-[#39D0D8]/0 blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between mb-4 relative">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#39D0D8] mb-2">Credential minted</div>
              <h2 className="text-xl font-semibold">{run.repo} · v1.0</h2>
            </div>
            <div className="size-12 rounded-md bg-gradient-to-br from-[#58A6FF] to-[#39D0D8] flex items-center justify-center">
              <Award className="size-6 text-[#0D1117]" strokeWidth={2} />
            </div>
          </div>
          <div className="space-y-3 text-sm relative">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Hash</span>
              <code className="font-mono text-[11px] text-[#58A6FF]">0x4a7c8e9f1b2d…e9f1</code>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Minted</span>
              <span className="font-mono text-[11px]">Apr 23, 2026 · 14:02 UTC</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Sealed by</span>
              <span className="font-mono text-[11px]">oracle node 0x12…ab</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Score sealed</span>
              <span className="font-mono text-[11px] text-[#3FB950]">{score} / 100</span>
            </div>
          </div>
          <button
            onClick={() => toast.success("Opening credential on chain")}
            className="mt-5 w-full border border-[#39D0D8]/40 text-[#39D0D8] h-9 rounded-md text-sm flex items-center justify-center gap-2 hover:bg-[#39D0D8]/10 transition-colors relative"
          >
            <ExternalLink className="size-4" /> View on chain
          </button>
          <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-muted-foreground">
            <ShieldCheck className="size-3 text-[#3FB950]" /> Fraud-proof · employer verifiable
          </div>
        </motion.div>
      </div>
    </div>
  );
}
