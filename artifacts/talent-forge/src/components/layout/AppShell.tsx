import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 min-w-0 pt-12 md:pt-0">
        {children}
      </main>
    </div>
  );
}
