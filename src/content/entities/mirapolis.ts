import { parse } from "yaml";
import raw from "./yaml/engagements/timeline/mirapolis-lms.yaml?raw";
import { defineEngagement } from "./defineEngagement";
import type { EngagementDefinition, EngagementLocale } from "./types";

const mirapolisDefinition = parse(raw) as EngagementDefinition;

const mirapolis = defineEngagement(mirapolisDefinition);

export function mirapolisHomeExp(locale: EngagementLocale) {
  return mirapolis.homeExp(locale);
}

export function mirapolisCvExperience(locale: EngagementLocale) {
  return mirapolis.cvExperience(locale);
}

export { mirapolisDefinition as mirapolisEngagementDefinition };
