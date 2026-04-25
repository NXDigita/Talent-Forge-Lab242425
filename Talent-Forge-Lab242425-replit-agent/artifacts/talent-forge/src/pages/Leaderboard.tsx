import { Link } from "wouter";
import { useState } from "react";
import { Trophy, Crown } from "lucide-react";
import { leaderboard, user } from "@/data";
import { cn } from "@/lib/utils";

const filters = ["Global", "Analog", "Digital", "Power", "RF", "Embedded", "Control"] as const;

export function Leaderboard() {
  const [f, setF] = useState<typeof filters[number]>("Global");
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold flex items-center gap-2"><Trophy className="size-6 text-[#F0B429]" /> Leaderboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Top engineers ranked by verified TFES</p>
      </div>

      <div className="flex items-center gap-2 mb-6 flex-wrap">
        {filters.map(x => (
          <button key={x} onClick={() => setF(x)}
            className={cn("px-3 h-8 rounded-md text-xs font-mono uppercase tracking-wider border",
              f === x ? "bg-[#58A6FF]/15 text-[#58A6FF] border-[#58A6FF]/40" : "border-border text-muted-foreground hover:text-foreground")}>
            {x}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8 items-end">
        {[top3[1], top3[0], top3[2]].map((u, i) => {
          const place = i === 0 ? 2 : i === 1 ? 1 : 3;
          const heights = [120, 160, 100];
          const colors = ["#8B949E", "#F0B429", "#A57044"];
          return (
            <Link key={u.id} href={`/portfolio/${u.id}`}>
              <div className="cursor-pointer">
                <div className="text-center mb-2">
                  {place === 1 && <Crown className="size-5 mx-auto text-[#F0B429] mb-1" />}
                  <div className="size-14 mx-auto rounded-md bg-gradient-to-br from-[#58A6FF]/30 to-[#39D0D8]/30 border border-border flex items-center justify-center font-mono font-semibold">
                    {u.avatar}
                  </div>
                  <div className="text-sm font-semibold mt-2 truncate">{u.name}</div>
                  <div className="text-[11px] font-mono" style={{ color: colors[i] }}>{u.tfes.toLocaleString()} TFES</div>
                </div>
                <div className="rounded-t-md border border-b-0 border-border flex items-center justify-center font-mono font-bold text-2xl"
                     style={{ height: heights[i], background: `${colors[i]}15`, color: colors[i] }}>
                  {place}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Table */}
      <div className="rounded-md bg-card border border-border overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_100px_100px_80px] gap-4 px-4 h-10 items-center border-b border-border text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
          <div>Rank</div><div>Engineer</div><div>TFES</div><div>Sims</div><div>Δ</div>
        </div>
        <div className="divide-y divide-border">
          {rest.map(u => {
            const isMe = u.id === user.id;
            return (
              <Link key={u.id} href={`/portfolio/${u.id}`}>
                <div className={cn("grid grid-cols-[60px_1fr_100px_100px_80px] gap-4 px-4 py-3 items-center hover:bg-[#0d1117] cursor-pointer text-sm",
                  isMe && "bg-[#58A6FF]/10")}>
                  <span className="font-mono text-muted-foreground">#{u.rank}</span>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="size-8 shrink-0 rounded-md bg-gradient-to-br from-[#58A6FF]/30 to-[#39D0D8]/30 border border-border flex items-center justify-center font-mono text-xs font-semibold">{u.avatar}</div>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{u.name} {isMe && <span className="text-[10px] font-mono text-[#58A6FF]">YOU</span>}</div>
                      <div className="text-[11px] font-mono text-muted-foreground truncate">@{u.handle}</div>
                    </div>
                  </div>
                  <span className="font-mono text-[#39D0D8]">{u.tfes.toLocaleString()}</span>
                  <span className="font-mono text-muted-foreground">{u.sims}</span>
                  <span className={cn("font-mono text-xs", u.delta > 0 ? "text-[#3FB950]" : u.delta < 0 ? "text-[#F85149]" : "text-muted-foreground")}>
                    {u.delta > 0 ? "+" : ""}{u.delta}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
