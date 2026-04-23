export type RunStatus = "PASS" | "FAIL" | "WARN" | "RUNNING" | "QUEUED";

export interface Run {
  id: string;
  repo: string;
  branch: string;
  commit: string;
  duration: string;
  score: number;
  status: RunStatus;
  time: string;
  author: string;
}

export const runs: Run[] = [
  { id: "run_8f4a1c", repo: "high-freq-oscillator", branch: "main", commit: "a1b2c3d", duration: "1m 12s", score: 98, status: "PASS", time: "10m ago", author: "arjun-hw" },
  { id: "run_7c3b2e", repo: "buck-converter-12v", branch: "feature/efficiency", commit: "e4f5g6h", duration: "2m 05s", score: 82, status: "WARN", time: "1h ago", author: "arjun-hw" },
  { id: "run_6d2e3f", repo: "opamp-cmos-2stage", branch: "fix/gain-margin", commit: "i7j8k9l", duration: "45s", score: 45, status: "FAIL", time: "3h ago", author: "arjun-hw" },
  { id: "run_5e1f4a", repo: "riscv-core-minimal", branch: "main", commit: "m0n1o2p", duration: "3m 30s", score: 100, status: "PASS", time: "1d ago", author: "arjun-hw" },
  { id: "run_4f0g5b", repo: "pll-fractional-n", branch: "wip/loop-filter", commit: "q3r4s5t", duration: "—", score: 0, status: "RUNNING", time: "Just now", author: "arjun-hw" },
  { id: "run_3g9h6c", repo: "i2c-master-controller", branch: "main", commit: "u6v7w8x", duration: "—", score: 0, status: "QUEUED", time: "In queue", author: "j-doe" },
  { id: "run_2h8i7d", repo: "pid-motor-control", branch: "main", commit: "y9z0a1b", duration: "1m 50s", score: 91, status: "PASS", time: "2d ago", author: "arjun-hw" },
  { id: "run_1i7j8e", repo: "sigma-delta-adc", branch: "experiment/oversampling", commit: "c2d3e4f", duration: "4m 18s", score: 76, status: "WARN", time: "3d ago", author: "arjun-hw" },
  { id: "run_9j6k9f", repo: "high-freq-oscillator", branch: "exp/inductor-q", commit: "g5h6i7j", duration: "1m 30s", score: 88, status: "PASS", time: "4d ago", author: "arjun-hw" },
  { id: "run_8k5l0g", repo: "opamp-cmos-2stage", branch: "main", commit: "k8l9m0n", duration: "55s", score: 94, status: "PASS", time: "5d ago", author: "arjun-hw" },
  { id: "run_7l4m1h", repo: "buck-converter-12v", branch: "main", commit: "o1p2q3r", duration: "2m 12s", score: 89, status: "PASS", time: "6d ago", author: "arjun-hw" },
  { id: "run_6m3n2i", repo: "riscv-core-minimal", branch: "feature/m-extension", commit: "s4t5u6v", duration: "5m 02s", score: 71, status: "WARN", time: "1w ago", author: "j-doe" },
  { id: "run_5n2o3j", repo: "pll-fractional-n", branch: "main", commit: "w7x8y9z", duration: "2m 45s", score: 95, status: "PASS", time: "1w ago", author: "arjun-hw" },
  { id: "run_4o1p4k", repo: "i2c-master-controller", branch: "main", commit: "a0b1c2d", duration: "30s", score: 100, status: "PASS", time: "2w ago", author: "arjun-hw" },
  { id: "run_3p0q5l", repo: "sigma-delta-adc", branch: "main", commit: "e3f4g5h", duration: "3m 50s", score: 84, status: "PASS", time: "2w ago", author: "arjun-hw" },
];

export const stages = [
  { id: 1, name: "Circuit Validation" },
  { id: 2, name: "SPICE Simulation" },
  { id: 3, name: "Waveform Analysis" },
  { id: 4, name: "Threshold Check" },
  { id: 5, name: "Scoring" },
  { id: 6, name: "Credential Minting" },
];

export function getBuildLog(repo: string, score: number): string[] {
  return [
    "[init] talent-forge runner v2.4.1 booting",
    `[init] cloning ${repo} @ HEAD`,
    "[init] resolving dependencies... ngspice 38, ngspice-models",
    "[1/6] Circuit Validation",
    "[validate] parsing netlist... 142 nodes, 218 elements",
    "[validate] DC operating point: convergence achieved",
    "[validate] topology check: OK",
    "[validate] PASS",
    "[2/6] SPICE Simulation",
    "[spice] tran 1p 50n",
    "[spice] simulation in progress... 12% 24% 41% 67% 88% 100%",
    "[spice] integration steps: 50412",
    "[spice] PASS",
    "[3/6] Waveform Analysis",
    "[wave] FFT on v(out1)... fundamental @ 5.02 GHz",
    "[wave] phase noise @ 1MHz offset: -118.4 dBc/Hz",
    "[wave] settling time: 8.2 ns",
    "[wave] PASS",
    "[4/6] Threshold Check",
    "[check] f0 within ±2% spec: PASS",
    "[check] PN < -110 dBc/Hz: PASS",
    "[check] power < 5mW: PASS (4.21 mW)",
    "[check] PASS",
    "[5/6] Scoring",
    "[score] correctness: 100",
    "[score] performance: 96",
    "[score] power efficiency: 98",
    "[score] robustness: 94",
    `[score] computed TFES: ${score}`,
    "[score] PASS",
    "[6/6] Credential Minting",
    "[mint] generating credential metadata...",
    "[mint] hash: 0x4a7c...e9f1",
    "[mint] sealed by oracle node 0x12...ab",
    "[mint] PASS",
    `[done] run completed in 1m 12s — TFES ${score}`,
  ];
}
