import { Link } from "wouter";
import { useState } from "react";
import { Trophy, Users } from "lucide-react";
import { challenges, categories } from "@/data";
import { CountdownTimer } from "@/components/common/CountdownTimer";
import { cn } from "@/lib/utils";

const diffColor: Record<string,string> = {
  Easy: "#3FB950", Medium: "#58A6FF", Hard: "#F0B429", Expert: "#F85149",
};

export function Challenges() {
  const [cat, setCat] = useState<string>("all");
  const filtered = cat === "all" ? challenges : challenges.filter(c => c.category === cat);
  return (
    <div className="p-6 md:p-8 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Challenges</h1>
        <p className="text-muted-foreground text-sm mt-1">Real ECE problems · verified solutions · ranked rewards</p>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        <button
          onClick={() => setCat("all")}
          className={cn("px-3 h-8 rounded-md text-xs font-mono uppercase tracking-wider border",
            cat === "all" ? "bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/40" : "border-border text-muted-foreground hover:text-foreground")}
        >All</button>
        {categories.map(c => (
          <button
            key={c.id}
            onClick={() => setCat(c.id)}
            className={cn("px-3 h-8 rounded-md text-xs font-mono uppercase tracking-wider border",
              cat === c.id ? "border-[#58A6FF]/40 bg-[#58A6FF]/10 text-[#58A6FF]" : "border-border text-muted-foreground hover:text-foreground")}
            style={cat === c.id ? { color: c.color, borderColor: `${c.color}66`, background: `${c.color}15` } : undefined}
          >{c.name}</button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(c => (
          <Link key={c.id} href={`/challenges/${c.id}`}>
            <div className="p-5 rounded-md bg-card border border-border hover:border-[#58A6FF]/50 transition-colors cursor-pointer h-full">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{c.title}</h3>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border"
                      style={{ color: diffColor[c.difficulty], borderColor: `${diffColor[c.difficulty]}40`, background: `${diffColor[c.difficulty]}15` }}>
                  {c.difficulty}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
              <div className="flex items-center justify-between mt-4 text-xs font-mono">
                <span className="flex items-center gap-1 text-[#F0B429]"><Trophy className="size-3" />{c.points} pts</span>
                <span className="flex items-center gap-1 text-muted-foreground"><Users className="size-3" />{c.attempts.toLocaleString()}</span>
                <CountdownTimer deadline={new Date(Date.now() + c.deadlineHours * 3600000)} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
