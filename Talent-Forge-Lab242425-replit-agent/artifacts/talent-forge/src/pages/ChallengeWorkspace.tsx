import { Link, useRoute } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Play, Save, FileText, ListChecks, Trophy, Users } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { challenges, getBuildLog } from "@/data";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { TerminalLog } from "@/components/terminal/TerminalLog";
import { Oscilloscope } from "@/components/oscilloscope/Oscilloscope";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const starter = `* Solution scaffold — edit and run
.title challenge solution

VDD vdd 0 DC 1.8
M1 out in vss vss NMOS W=2u L=180n
M2 out in vdd vdd PMOS W=4u L=180n

.tran 1ps 50ns
.measure tran tphl trig v(in) val=0.9 rise=1 targ v(out) val=0.9 fall=1
.end
`;

const tabs = ["problem", "solution", "tests"] as const;

export function ChallengeWorkspace() {
  const [, params] = useRoute("/challenges/:id");
  const ch = challenges.find(c => c.id === params?.id) ?? challenges[0];
  const [tab, setTab] = useState<typeof tabs[number]>("problem");
  const [code, setCode] = useState(starter);
  const [running, setRunning] = useState(false);
  const [logKey, setLogKey] = useState(0);

  const runSim = () => {
    setRunning(true);
    setLogKey(k => k + 1);
    toast.success("Simulation started");
    setTimeout(() => setRunning(false), 6000);
  };
  const submit = () => toast.success(`Solution submitted — +${ch.points} pts pending verification`);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-4 shrink-0">
        <Link href="/challenges">
          <span className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 cursor-pointer">
            <ArrowLeft className="size-3" /> Challenges
          </span>
        </Link>
        <div className="h-6 w-px bg-border" />
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold truncate">{ch.title}</h1>
          <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-3">
            <span className="text-[#F0B429]">{ch.difficulty}</span>
            <span className="flex items-center gap-1"><Trophy className="size-3" />{ch.points} pts</span>
            <span className="flex items-center gap-1"><Users className="size-3" />{ch.attempts.toLocaleString()}</span>
          </div>
        </div>
        <CountdownTimer deadline={new Date(Date.now() + ch.deadlineHours * 3600000)} />
        <button onClick={() => toast.success("Draft saved")} className="border border-border h-8 px-3 rounded-md text-xs flex items-center gap-1.5 hover:bg-card">
          <Save className="size-3.5" /> Save
        </button>
        <button onClick={runSim} className="bg-[#58A6FF] text-black h-8 px-3 rounded-md text-xs font-semibold flex items-center gap-1.5 hover:bg-[#58A6FF]/90">
          <Play className="size-3.5" /> Run
        </button>
        <button onClick={submit} className="bg-[#3FB950] text-black h-8 px-3 rounded-md text-xs font-semibold hover:bg-[#3FB950]/90">
          Submit
        </button>
      </header>

      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal">
          {/* Left: tabs */}
          <Panel defaultSize={32} minSize={22}>
            <div className="h-full flex flex-col border-r border-border">
              <div className="flex items-center border-b border-border">
                {tabs.map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn("px-4 h-10 text-xs font-mono uppercase tracking-wider border-b-2 -mb-px",
                      tab === t ? "border-[#F0B429] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}
                  >
                    {t === "problem" ? <span className="flex items-center gap-1.5"><FileText className="size-3.5" />Problem</span>
                      : t === "solution" ? <span className="flex items-center gap-1.5"><Play className="size-3.5" />Solution</span>
                      : <span className="flex items-center gap-1.5"><ListChecks className="size-3.5" />Tests</span>}
                  </button>
                ))}
              </div>
              <div className="flex-1 overflow-y-auto p-5 text-sm leading-relaxed">
                {tab === "problem" && (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">{ch.desc}</p>
                    <h3 className="font-semibold">Specifications</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-[13px]">
                      <li>Supply voltage: 1.8V ± 5%</li>
                      <li>Operating temp: -40°C to 125°C</li>
                      <li>Load capacitance: 10pF</li>
                      <li>Power budget: 25mW max</li>
                    </ul>
                    <h3 className="font-semibold">Acceptance criteria</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground text-[13px]">
                      <li>All testbenches pass at TT, FF, and SS corners</li>
                      <li>Final score ≥ 75 to receive credential</li>
                      <li>No DRC violations in final layout</li>
                    </ul>
                  </div>
                )}
                {tab === "solution" && (
                  <textarea
                    value={code} onChange={e => setCode(e.target.value)}
                    className="w-full h-full min-h-[400px] bg-[#0a0d12] border border-border rounded-md p-3 font-mono text-[12px] leading-relaxed text-foreground/90 focus:outline-none focus:border-[#58A6FF]/60 resize-none"
                    spellCheck={false}
                  />
                )}
                {tab === "tests" && (
                  <div className="space-y-2">
                    {["dc_sweep_op_point", "transient_50ns", "monte_carlo_100", "corner_TT", "corner_FF", "corner_SS"].map((t, i) => (
                      <motion.div
                        key={t}
                        initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between p-3 rounded-md bg-card border border-border"
                      >
                        <code className="text-[12px] font-mono">{t}</code>
                        <span className="text-[10px] font-mono uppercase text-[#3FB950]">PASS</span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="w-1 bg-border hover:bg-[#58A6FF]/40 transition-colors" />

          {/* Right: terminal + scope */}
          <Panel defaultSize={68} minSize={40}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={55} minSize={25}>
                <div className="h-full p-4 overflow-hidden">
                  <TerminalLog
                    key={logKey}
                    lines={running ? getBuildLog(ch.title, 88) : ["[ready] press Run to simulate", "[hint] modify .tran step for finer resolution", "[hint] use .meas for parameterized scoring"]}
                    interval={running ? 80 : 999999}
                    height={360}
                    prompt="arjun-hw@forge / sandbox"
                  />
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-border hover:bg-[#58A6FF]/40 transition-colors" />
              <Panel defaultSize={45} minSize={20}>
                <div className="h-full p-4">
                  <div className="rounded-md bg-card border border-border h-full flex flex-col overflow-hidden">
                    <div className="px-3 h-9 border-b border-border flex items-center justify-between text-xs font-mono text-muted-foreground shrink-0">
                      <span>Waveform · v(out)</span>
                      <span className="text-[#39D0D8]">{running ? "capturing..." : "idle"}</span>
                    </div>
                    <div className="flex-1 p-3 min-h-0">
                      <Oscilloscope wave="composite" height={240} />
                    </div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
}
