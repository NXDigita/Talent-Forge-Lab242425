export type RepoStatus = "PASS" | "FAIL" | "WARN" | "RUNNING" | "QUEUED";

export interface Repo {
  id: string;
  name: string;
  desc: string;
  language: string;
  stars: number;
  forks: number;
  lastSim: RepoStatus;
  updated: string;
  category: string;
}

export const repos: Repo[] = [
  { id: "repo_1", name: "high-freq-oscillator", desc: "5GHz low phase noise oscillator design for RF frontends.", language: "SPICE", stars: 142, forks: 18, lastSim: "PASS", updated: "2h ago", category: "rf" },
  { id: "repo_2", name: "buck-converter-12v", desc: "High efficiency synchronous buck converter stepping 12V to 3.3V.", language: "Verilog-A", stars: 89, forks: 12, lastSim: "WARN", updated: "5h ago", category: "power" },
  { id: "repo_3", name: "riscv-core-minimal", desc: "RV32I core implementation optimized for area on Xilinx 7-series.", language: "Verilog", stars: 204, forks: 41, lastSim: "PASS", updated: "1d ago", category: "digital" },
  { id: "repo_4", name: "opamp-cmos-2stage", desc: "Two-stage CMOS operational amplifier with 80dB DC gain.", language: "SPICE", stars: 56, forks: 7, lastSim: "FAIL", updated: "2d ago", category: "analog" },
  { id: "repo_5", name: "pll-fractional-n", desc: "Fractional-N PLL for precise frequency synthesis from 1-10GHz.", language: "SPICE", stars: 112, forks: 22, lastSim: "PASS", updated: "3d ago", category: "rf" },
  { id: "repo_6", name: "i2c-master-controller", desc: "Standard-mode I2C master written in synthesizable VHDL.", language: "VHDL", stars: 45, forks: 5, lastSim: "PASS", updated: "1w ago", category: "embedded" },
  { id: "repo_7", name: "pid-motor-control", desc: "Discrete-time PID controller for BLDC motor speed regulation.", language: "C", stars: 73, forks: 11, lastSim: "PASS", updated: "1w ago", category: "control" },
  { id: "repo_8", name: "sigma-delta-adc", desc: "1st order sigma-delta ADC with decimation filter.", language: "SPICE", stars: 38, forks: 4, lastSim: "WARN", updated: "2w ago", category: "analog" },
];

export const filesByRepo: Record<string, { name: string; type: string; content: string }[]> = {
  repo_1: [
    { name: "README.md", type: "md", content: "# high-freq-oscillator\n\n5GHz LC tank oscillator with cross-coupled NMOS pair.\n\n## Specs\n- f0: 5.02 GHz\n- Phase noise: -118 dBc/Hz @ 1MHz\n- Power: 4.2 mW\n" },
    { name: "oscillator.sch", type: "sch", content: "* High Frequency LC Oscillator\n* Cross-coupled NMOS pair\nM1 out1 out2 0 0 nmos w=20u l=180n\nM2 out2 out1 0 0 nmos w=20u l=180n\nL1 vdd out1 800p\nL2 vdd out2 800p\nC1 out1 out2 1.26p\nIbias vdd vbias 2m" },
    { name: "tb_transient.cir", type: "cir", content: ".include 'oscillator.sch'\n.tran 1p 50n\n.options post=2 reltol=1e-5\n.probe v(out1) v(out2)\n.end" },
    { name: "results.vcd", type: "vcd", content: "$date Apr 23 2026 $end\n$version SPICE3 $end\n$timescale 1ps $end\n$var wire 1 ! out1 $end\n... [waveform data 1.2MB]" },
  ],
  repo_2: [
    { name: "README.md", type: "md", content: "# buck-converter-12v\n\nSynchronous buck converter, 95% efficiency target." },
    { name: "buck.sch", type: "sch", content: "* Synchronous buck\nVin in 0 12\nM_HS sw in pwm 0 nmos w=10m l=350n\nM_LS 0 sw_b sw 0 nmos w=10m l=350n\nL1 sw out 4.7u\nC1 out 0 22u\nRload out 0 3.3" },
    { name: "ctrl.cir", type: "cir", content: "* PWM controller, 500kHz\nVpwm pwm 0 PULSE(0 5 0 1n 1n 1u 2u)" },
    { name: "efficiency.vcd", type: "vcd", content: "$date Apr 23 2026 $end\n... [waveform data]" },
  ],
};

filesByRepo.repo_3 = filesByRepo.repo_1;
filesByRepo.repo_4 = filesByRepo.repo_1;
filesByRepo.repo_5 = filesByRepo.repo_1;
filesByRepo.repo_6 = filesByRepo.repo_2;
filesByRepo.repo_7 = filesByRepo.repo_2;
filesByRepo.repo_8 = filesByRepo.repo_1;

export const commits = [
  { hash: "a1b2c3d", message: "Tune tail current for lower phase noise", author: "arjun-hw", date: "2h ago" },
  { hash: "9f8e7d6", message: "Add Monte Carlo corner analysis", author: "arjun-hw", date: "1d ago" },
  { hash: "7c6b5a4", message: "Fix netlist topology — swap drain/source on M2", author: "j-doe", date: "3d ago" },
  { hash: "5d4c3b2", message: "Initial schematic and testbench", author: "arjun-hw", date: "1w ago" },
];
