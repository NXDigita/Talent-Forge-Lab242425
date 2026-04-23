# Talent Forge — ECE Lab

A dark-mode React + Vite web app that frames Electrical & Computer Engineering skill assessment as a DevOps platform: CircuitHub (version control for circuits), SimDeploy (CI/CD for SPICE simulations), and SkillEdge (verified, fraud-proof credentials).

## Architecture
- pnpm monorepo. Single artifact: `artifacts/talent-forge` (React + Vite, port 25859, previewPath `/`).
- Routing: `wouter` with `Switch`/`Route`, base path = `import.meta.env.BASE_URL`.
- Layout: `AppShell` (collapsible mobile drawer + desktop sidebar) wraps every page except Landing, Portfolio, and ChallengeWorkspace.
- State: TanStack Query provider wired (no live data — all mocks).
- Toasts: `sonner` (dark theme, bottom-right).
- All data is mocked in `src/data/*` and re-exported from `src/data/index.ts`.

## Design tokens (strict)
- Background `#0D1117`, card `#161B22`, border `#30363D`.
- Primary `#58A6FF`, success `#3FB950`, warning `#F0B429`, error `#F85149`, waveform/cyan `#39D0D8`.
- Fonts: Inter (body), JetBrains Mono (headings, code, status pills).
- Dark mode only. No emojis. Lucide icons throughout.

## Pages
- `/` Landing — hero, terminal preview, three-module grid, six-domain grid, live leaderboard ticker.
- `/dashboard` — TFES/XP/sims/credentials stats, recent runs, live capture, active challenges.
- `/circuithub` — profile, contribution heatmap (52×7), repo grid with search.
- `/circuithub/:repoId` — Files / Commits / Simulations tabs, file viewer with line numbers.
- `/simdeploy` — runs table, status filter, search.
- `/simdeploy/:runId` — header + score + Re-run, six-stage `PipelineStages`, animated `TerminalLog`, `Oscilloscope`, four `ScoreBar`s, on-chain credential card.
- `/skilledge` — TFES line trend, domain radar, breakdown table, credential wall, employer Credential Shield verifier.
- `/challenges` — filterable challenge cards with countdowns.
- `/challenges/:id` — 3-tab workspace (Problem / Solution / Tests) + resizable terminal + scope (uses `react-resizable-panels`).
- `/portfolio/:id` — public profile with charts, skill bars, credential gallery, timeline.
- `/leaderboard` — podium for top 3, table for ranks 4+.

## Key components
- `components/terminal/TerminalLog.tsx` — typewriter log with `[tag]` color parsing, replay, window-chrome header.
- `components/oscilloscope/Oscilloscope.tsx` — SVG waveform with stroke-draw + infinite x-shift; `composite | sine | square | damped`.
- `components/common/PipelineStages.tsx` — 6-step pipeline with active/done/failed states.
- `components/common/StatusBadge.tsx` — PASS / FAIL / WARN / RUNNING / QUEUED / READY / BUILDING.
- `components/common/ScoreBar.tsx` — animated metric bar.
- `components/common/ContributionHeatmap.tsx` — 52×7 GitHub-style grid.
- `components/common/CountdownTimer.tsx` — live deadline timer.
- `components/layout/Sidebar.tsx` + `AppShell.tsx`.

## Dependencies (already in `artifacts/talent-forge/package.json`)
`wouter`, `framer-motion`, `recharts`, `lucide-react`, `sonner`, `react-resizable-panels`, `@tanstack/react-query`, full shadcn/Radix set.
