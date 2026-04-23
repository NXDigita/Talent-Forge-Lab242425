export interface Credential {
  id: string;
  title: string;
  domain: string;
  hash: string;
  score: number;
  date: string;
  gradient: string;
}

export const credentials: Credential[] = [
  { id: "cr_1", title: "RF Oscillator Master", domain: "rf",       hash: "0x4a7c8e9f1b2d3c4e5f6a7b8c9d0e1f2a", score: 98, date: "Apr 23, 2026", gradient: "from-cyan-500/40 via-blue-500/20 to-cyan-500/0" },
  { id: "cr_2", title: "Digital Synthesis Pro", domain: "digital", hash: "0x8b3d1e2f4a5c6d7e8f9a0b1c2d3e4f5a", score: 100, date: "Apr 18, 2026", gradient: "from-emerald-500/40 via-teal-500/20 to-emerald-500/0" },
  { id: "cr_3", title: "Power Efficiency Expert", domain: "power", hash: "0x2c4e6f8a0b1d3e5f7a9b0c2d4e6f8a0b", score: 89, date: "Apr 10, 2026", gradient: "from-amber-500/40 via-orange-500/20 to-amber-500/0" },
  { id: "cr_4", title: "Analog Designer Tier II", domain: "analog", hash: "0x6f8a0b2c4d6e8f0a1b3c5d7e9f1a3b5c", score: 94, date: "Apr 02, 2026", gradient: "from-blue-500/40 via-indigo-500/20 to-blue-500/0" },
  { id: "cr_5", title: "Embedded Systems Adept", domain: "embedded", hash: "0xa0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5", score: 91, date: "Mar 28, 2026", gradient: "from-violet-500/40 via-purple-500/20 to-violet-500/0" },
  { id: "cr_6", title: "Control Loop Architect", domain: "control", hash: "0xe0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5", score: 87, date: "Mar 21, 2026", gradient: "from-rose-500/40 via-pink-500/20 to-rose-500/0" },
];
