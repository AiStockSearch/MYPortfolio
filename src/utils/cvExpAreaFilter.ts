import type { AreaBuckets } from "../content/entities/types";

export function mergeAchBuckets(a: AreaBuckets): string[] {
  return [...a.front, ...a.mobile, ...a.backend];
}

export function mergeStackBuckets(s: AreaBuckets): string[] {
  return [...s.front, ...s.mobile, ...s.backend];
}

export function entryHasCvArea(
  achByArea: AreaBuckets,
  stackByArea: AreaBuckets,
  area: "front" | "mobile" | "backend"
): boolean {
  const bullets = achByArea[area] ?? [];
  const tags = stackByArea[area] ?? [];
  return bullets.length > 0 || tags.length > 0;
}
