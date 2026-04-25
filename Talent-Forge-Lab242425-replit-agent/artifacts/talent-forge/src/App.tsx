import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { Landing } from "@/pages/Landing";
import { Dashboard } from "@/pages/Dashboard";
import { CircuitHub } from "@/pages/CircuitHub";
import { CircuitHubRepo } from "@/pages/CircuitHubRepo";
import { SimDeploy } from "@/pages/SimDeploy";
import { SimDeployRun } from "@/pages/SimDeployRun";
import { SkillEdge } from "@/pages/SkillEdge";
import { Challenges } from "@/pages/Challenges";
import { ChallengeWorkspace } from "@/pages/ChallengeWorkspace";
import { Portfolio } from "@/pages/Portfolio";
import { Leaderboard } from "@/pages/Leaderboard";
import { Playground } from "@/pages/Playground";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function shell(Page: React.ComponentType) {
  return () => (
    <AppShell>
      <Page />
    </AppShell>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/dashboard" component={shell(Dashboard)} />
      <Route path="/circuithub" component={shell(CircuitHub)} />
      <Route path="/circuithub/:repoId" component={shell(CircuitHubRepo)} />
      <Route path="/simdeploy" component={shell(SimDeploy)} />
      <Route path="/simdeploy/:runId" component={shell(SimDeployRun)} />
      <Route path="/skilledge" component={shell(SkillEdge)} />
      <Route path="/challenges" component={shell(Challenges)} />
      <Route path="/challenges/:id" component={ChallengeWorkspace} />
      <Route path="/portfolio/:id" component={Portfolio} />
      <Route path="/leaderboard" component={shell(Leaderboard)} />
      <Route path="/playground" component={shell(Playground)} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#161B22",
              border: "1px solid #30363D",
              color: "#c9d1d9",
              fontFamily: "Inter, sans-serif",
            },
          }}
        />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
