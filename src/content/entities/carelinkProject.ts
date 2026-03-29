import { getStandaloneProjectDocById } from "./standaloneProjectsYaml";

export function getCarelinkProjectDoc(): Record<string, unknown> {
  return getStandaloneProjectDocById("carelink");
}
