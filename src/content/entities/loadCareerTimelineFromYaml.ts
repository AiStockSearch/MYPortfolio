import { parse } from "yaml";
import type { EngagementDefinition } from "./types";

type WithTimelineIndex = EngagementDefinition & { timelineIndex?: number };

const rawModules = import.meta.glob<string>("./yaml/engagements/timeline/*.yaml", {
  eager: true,
  query: "?raw",
  import: "default",
});

/**
 * Каждый файл в `yaml/engagements/timeline/` — автономный кейс карьеры.
 * Поле `timelineIndex` задаёт порядок в таймлайне (как раньше `CAREER_TIMELINE_DEFINITIONS`).
 */
export function loadCareerTimelineFromYaml(): EngagementDefinition[] {
  const rows: { idx: number; def: EngagementDefinition }[] = [];
  for (const content of Object.values(rawModules)) {
    const data = parse(content) as WithTimelineIndex;
    const idx = data.timelineIndex ?? 0;
    const { timelineIndex: _drop, ...rest } = data;
    rows.push({ idx, def: rest as EngagementDefinition });
  }
  rows.sort((a, b) => a.idx - b.idx);
  /** Mirapolis подключается отдельно (`mirapolis.ts`), файл может лежать рядом с этапами в `timeline/`. */
  return rows.filter((r) => r.def.id !== "mirapolis-lms").map((r) => r.def);
}
