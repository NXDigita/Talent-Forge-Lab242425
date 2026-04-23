import { Link, useLocation } from "wouter";
import { useState } from "react";
import { LayoutDashboard, GitBranch, Rocket, BarChart3, Trophy, Swords, User, Cpu, Menu, X } from "lucide-react";
import { user } from "@/data";
import { cn } from "@/lib/utils";

const items = [
  { href: "/dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { href: "/circuithub", label: "CircuitHub", icon: GitBranch },
  { href: "/simdeploy",  label: "SimDeploy",  icon: Rocket },
  { href: "/skilledge",  label: "SkillEdge",  icon: BarChart3 },
  { href: "/challenges", label: "Challenges", icon: Swords },
  { href: "/leaderboard",label: "Leaderboard",icon: Trophy },
  { href: `/portfolio/${user.id}`, label: "Portfolio", icon: User },
];

function NavBody({ onNavigate }: { onNavigate?: () => void }) {
  const [loc] = useLocation();
  return (
    <div className="flex flex-col h-full">
      <Link href="/" onClick={onNavigate}>
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-border cursor-pointer">
          <div className="size-8 rounded-md bg-gradient-to-br from-[#58A6FF] to-[#39D0D8] flex items-center justify-center font-mono font-bold text-[#0D1117] shadow-[0_0_12px_rgba(88,166,255,0.4)]">
            <Cpu className="size-4" strokeWidth={2.5} />
          </div>
          <div>
            <div className="text-sm font-semibold leading-none">Talent Forge</div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground mt-1">ECE Lab v2.4</div>
          </div>
        </div>
      </Link>

      <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
        {items.map(it => {
          const active = loc === it.href || (it.href !== "/dashboard" && loc.startsWith(it.href));
          const Icon = it.icon;
          return (
            <Link key={it.href} href={it.href} onClick={onNavigate}>
              <div className={cn(
                "flex items-center gap-3 px-3 h-9 rounded-md text-sm cursor-pointer transition-colors",
                active
                  ? "bg-[#58A6FF]/10 text-[#58A6FF] border border-[#58A6FF]/20"
                  : "text-muted-foreground hover:bg-card hover:text-foreground border border-transparent"
              )}>
                <Icon className="size-4" />
                <span>{it.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 p-2 rounded-md bg-card border border-border">
          <div className="size-9 rounded-md bg-gradient-to-br from-[#58A6FF]/30 to-[#39D0D8]/30 border border-[#58A6FF]/30 flex items-center justify-center font-mono text-xs font-semibold text-[#58A6FF]">
            {user.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate">{user.name}</div>
            <div className="text-[10px] font-mono text-[#39D0D8] flex items-center gap-1">
              TFES {user.tfes.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-12 bg-[#0D1117] border-b border-border flex items-center px-3 justify-between">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-md bg-gradient-to-br from-[#58A6FF] to-[#39D0D8] flex items-center justify-center">
            <Cpu className="size-3.5 text-[#0D1117]" strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold">Talent Forge</span>
        </div>
        <button onClick={() => setOpen(true)} aria-label="open menu" className="p-2"><Menu className="size-5" /></button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="w-64 bg-[#0D1117] border-l border-border relative">
            <button onClick={() => setOpen(false)} aria-label="close" className="absolute top-3 right-3 z-10 p-1.5 rounded hover:bg-card">
              <X className="size-4" />
            </button>
            <NavBody onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-60 border-r border-border bg-[#0D1117] flex-col h-screen sticky top-0">
        <NavBody />
      </aside>
    </>
  );
}
