import type { EngagementDefinition } from "./types";
import { loadCareerTimelineFromYaml } from "./loadCareerTimelineFromYaml";

export const CAREER_TIMELINE_DEFINITIONS: EngagementDefinition[] =
  loadCareerTimelineFromYaml();
