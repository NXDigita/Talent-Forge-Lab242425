const COLORS = ["#161B22", "#0e4429", "#006d32", "#26a641", "#39d353"];

export function ContributionHeatmap({ data }: { data: number[][] }) {
  const cell = 11;
  const gap = 3;
  const width = 52 * (cell + gap);
  const height = 7 * (cell + gap);
  const months = ["May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr"];
  return (
    <div className="overflow-x-auto">
      <svg width={width + 28} height={height + 22} className="font-mono text-[10px]">
        {months.map((m, i) => (
          <text key={m} x={28 + i * (52 * (cell + gap)) / 12} y={10} fill="#8B949E">{m}</text>
        ))}
        {data.map((week, x) =>
          week.map((v, y) => (
            <rect
              key={`${x}-${y}`}
              x={28 + x * (cell + gap)}
              y={18 + y * (cell + gap)}
              width={cell}
              height={cell}
              rx={2}
              fill={COLORS[v]}
            >
              <title>{v} contributions</title>
            </rect>
          ))
        )}
      </svg>
    </div>
  );
}
