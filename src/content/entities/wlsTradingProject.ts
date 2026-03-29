import { getStandaloneProjectDocById } from "./standaloneProjectsYaml";

export function getWlsTradingProjectDoc(): Record<string, unknown> {
  return getStandaloneProjectDocById("wls-trading");
}
