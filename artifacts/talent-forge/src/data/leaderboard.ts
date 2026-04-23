export interface LeaderEntry {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  region: "NA" | "EU" | "APAC" | "SA" | "AF";
  domain: string;
  tfes: number;
  sims: number;
  change: number;
}

const names = [
  "Lin Wei", "Sarah Mendez", "Aarav Patel", "Yuki Tanaka", "Kofi Asante", "Mateo Rossi",
  "Priya Sharma", "Erik Lindqvist", "Fatima Zahra", "Daniil Volkov", "Chen Yu", "Olivia Brown",
  "Hiroshi Sato", "Anika Singh", "Lucas Silva", "Marie Dubois", "Omar Hassan", "Ines Castro",
  "Noah Walker", "Aisha Khan", "Tomas Novak", "Liu Bei", "Arjun Reddy", "Sofia Ivanova",
  "Kai Nakamura", "Zara Ahmad", "Ethan Chen", "Maya Gupta", "Diego Lopez", "Hana Kim",
  "Alice Chen", "Ben Carter",
];
const regions: LeaderEntry["region"][] = ["NA","EU","APAC","SA","AF"];
const domains = ["analog","digital","power","rf","embedded","control"];

export const leaderboard: LeaderEntry[] = names.map((n, i) => ({
  rank: i + 1,
  id: `lb_${i+1}`,
  name: n,
  avatar: n.split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase(),
  region: regions[i % regions.length],
  domain: domains[i % domains.length],
  tfes: Math.round(9920 - i * 60 - Math.random() * 30),
  sims: Math.round(120 - i * 2 - Math.random() * 8),
  change: Math.round((Math.random() - 0.5) * 20),
}));
