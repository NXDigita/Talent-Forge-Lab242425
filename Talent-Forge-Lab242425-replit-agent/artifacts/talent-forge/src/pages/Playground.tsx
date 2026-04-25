import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Save, RotateCw, Download, FileCode, Cpu, Zap } from "lucide-react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { TerminalLog } from "@/components/terminal/TerminalLog";
import { Oscilloscope, type Wave } from "@/components/oscilloscope/Oscilloscope";
import { getBuildLog } from "@/data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const presets: Record<string, { label: string; code: string; wave: Wave }> = {
  rc_lowpass: {
    label: "RC Low-Pass Filter",
    wave: "composite",
    code: `* RC low-pass filter — fc ≈ 1.59 kHz
.title rc_lowpass

Vin in 0 SIN(0 1 1k)
R1 in out 1k
C1 out 0 100n

.tran 10us 5ms
.measure tran vmax MAX v(out)
.end
`,
  },
  cmos_inverter: {
    label: "CMOS Inverter",
    wave: "square",
    code: `* CMOS inverter — 180nm
.title cmos_inverter

VDD vdd 0 DC 1.8
Vin in 0 PULSE(0 1.8 0 100p 100p 5n 10n)
M1 out in vdd vdd PMOS W=4u L=180n
M2 out in 0   0   NMOS W=2u L=180n
CL out 0 10f

.tran 10p 50n
.end
`,
  },
  lc_oscillator: {
    label: "LC Oscillator",
    wave: "sine",
    code: `* LC tank oscillator @ 5 GHz
.title lc_oscillator

L1 tank 0 1n
C1 tank 0 1p
Rp tank 0 5k
Vstart tank 0 PULSE(0 0.1 0 1p 1p 1n 1)

.tran 1p 20n
.end
`,
  },
  rlc_damped: {
    label: "RLC Damped Response",
    wave: "damped",
    code: `* Series RLC underdamped step response
.title rlc_damped

Vstep in 0 PULSE(0 1 0 1n 1n 1u 2u)
R1 in n1  10
L1 n1 out 100u
C1 out 0  1n

.tran 100n 100u
.end
`,
  },
};

const idle = [
  "[ready] sandbox initialised — no run yet",
  "[hint] choose a preset or edit the netlist on the left",
  "[hint] press Run to launch ngspice in scratch mode",
  "[hint] Playground runs are NOT scored and do NOT mint credentials",
];

export function Playground() {
  const [presetKey, setPresetKey] = useState<keyof typeof presets>("rc_lowpass");
  const [code, setCode] = useState(presets.rc_lowpass.code);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [logKey, setLogKey] = useState(0);
  const [wave, setWave] = useState<Wave>("composite");

  const loadPreset = (k: keyof typeof presets) => {
    setPresetKey(k);
    setCode(presets[k].code);
    setWave(presets[k].wave);
    toast.success(`Loaded preset · ${presets[k].label}`);
  };

  const run = () => {
    setRunning(true);
    setHasRun(true);
    setLogKey(k => k + 1);
    toast.success("Sandbox simulation started");
    setTimeout(() => setRunning(false), 5500);
  };

  const reset = () => {
    setHasRun(false);
    setRunning(false);
    setLogKey(k => k + 1);
    toast.success("Sandbox cleared");
  };

  return (
    <div className="flex flex-col h-screen md:h-[calc(100vh)] min-h-0">
      {/* Top bar */}
      <header className="h-14 border-b border-border flex items-center px-4 gap-3 shrink-0">
        <div className="size-8 rounded-md bg-gradient-to-br from-[#F0B429]/30 to-[#F85149]/30 border border-[#F0B429]/40 flex items-center justify-center">
          <Zap className="size-4 text-[#F0B429]" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-semibold flex items-center gap-2">
            Playground
            <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded border border-[#F0B429]/40 text-[#F0B429] bg-[#F0B429]/10">
              scratch · unscored
            </span>
          </h1>
          <div className="text-[11px] font-mono text-muted-foreground">
            test SPICE netlists in isolation · no credentials minted
          </div>
        </div>
        <button
          onClick={() => toast.success(`Snippet exported · ${presetKey}.cir`)}
          className="border border-border h-8 px-3 rounded-md text-xs flex items-center gap-1.5 hover:bg-card"
        >
          <Download className="size-3.5" /> Export
        </button>
        <button
          onClick={() => toast.success("Snapshot saved to drafts")}
          className="border border-border h-8 px-3 rounded-md text-xs flex items-center gap-1.5 hover:bg-card"
        >
          <Save className="size-3.5" /> Save
        </button>
        <button
          onClick={reset}
          className="border border-border h-8 px-3 rounded-md text-xs flex items-center gap-1.5 hover:bg-card"
        >
          <RotateCw className="size-3.5" /> Reset
        </button>
        <button
          onClick={run}
          disabled={running}
          className="bg-[#3FB950] text-black h-8 px-4 rounded-md text-xs font-semibold flex items-center gap-1.5 hover:bg-[#3FB950]/90 disabled:opacity-50"
        >
          <Play className="size-3.5" /> {running ? "Running…" : "Run"}
        </button>
      </header>

      {/* Preset bar */}
      <div className="border-b border-border px-4 h-11 flex items-center gap-2 overflow-x-auto shrink-0 bg-[#0a0d12]">
        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">Presets</span>
        {(Object.keys(presets) as (keyof typeof presets)[]).map(k => (
          <button
            key={k}
            onClick={() => loadPreset(k)}
            className={cn(
              "px-3 h-7 rounded-md text-xs font-mono whitespace-nowrap border transition-colors",
              presetKey === k
                ? "border-[#58A6FF]/50 bg-[#58A6FF]/10 text-[#58A6FF]"
                : "border-border text-muted-foreground hover:text-foreground hover:bg-card"
            )}
          >
            {presets[k].label}
          </button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 min-h-0">
        <PanelGroup direction="horizontal">
          {/* Editor */}
          <Panel defaultSize={45} minSize={25}>
            <div className="h-full flex flex-col border-r border-border">
              <div className="px-3 h-9 border-b border-border flex items-center justify-between text-xs font-mono text-muted-foreground bg-[#0a0d12] shrink-0">
                <span className="flex items-center gap-1.5"><FileCode className="size-3.5" />sandbox.cir</span>
                <span>{code.split("\n").length} lines · spice3f5</span>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden bg-[#0a0d12]">
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  spellCheck={false}
                  className="w-full h-full bg-[#0a0d12] p-4 font-mono text-[12px] leading-relaxed text-foreground/90 focus:outline-none resize-none"
                />
              </div>
              <div className="px-3 h-8 border-t border-border flex items-center justify-between text-[10px] font-mono text-muted-foreground bg-[#0a0d12] shrink-0">
                <span className="flex items-center gap-1.5"><Cpu className="size-3" />ngspice 38 · scratch runner</span>
                <span>UTF-8 · LF</span>
              </div>
            </div>
          </Panel>
          <PanelResizeHandle className="w-1 bg-border hover:bg-[#58A6FF]/40 transition-colors" />

          {/* Output */}
          <Panel defaultSize={55} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={55} minSize={25}>
                <div className="h-full p-4 overflow-hidden">
                  <TerminalLog
                    key={logKey}
                    lines={hasRun ? getBuildLog(presets[presetKey].label, 0) : idle}
                    interval={hasRun ? 80 : 999999}
                    height={360}
                    prompt="arjun-hw@forge / playground"
                  />
                </div>
              </Panel>
              <PanelResizeHandle className="h-1 bg-border hover:bg-[#58A6FF]/40 transition-colors" />
              <Panel defaultSize={45} minSize={20}>
                <div className="h-full p-4">
                  <div className="rounded-md bg-card border border-border h-full flex flex-col overflow-hidden">
                    <div className="px-3 h-9 border-b border-border flex items-center justify-between text-xs font-mono text-muted-foreground shrink-0">
                      <span>Waveform · v(out)</span>
                      <span className="text-[#39D0D8] flex items-center gap-1.5">
                        {running && <span className="size-1.5 rounded-full bg-[#39D0D8] animate-pulse" />}
                        {running ? "capturing…" : hasRun ? "captured" : "idle"}
                      </span>
                    </div>
                    <div className="flex-1 p-3 min-h-0">
                      {hasRun ? (
                        <motion.div key={logKey} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full">
                          <Oscilloscope wave={wave} height={240} />
                        </motion.div>
                      ) : (
                        <div className="h-full rounded-md border border-dashed border-border flex items-center justify-center text-xs font-mono text-muted-foreground">
                          press Run to capture v(out)
                        </div>
                      )}
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
