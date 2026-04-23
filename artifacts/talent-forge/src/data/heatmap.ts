function rng(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

const r = rng(42);
export const heatmap: number[][] = Array.from({ length: 52 }, () =>
  Array.from({ length: 7 }, () => {
    const v = r();
    if (v < 0.45) return 0;
    if (v < 0.7) return 1;
    if (v < 0.85) return 2;
    if (v < 0.95) return 3;
    return 4;
  })
);
