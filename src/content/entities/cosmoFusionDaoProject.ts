import { getStandaloneProjectDocById } from "./standaloneProjectsYaml";

export function getCosmoFusionDaoProjectDoc(): Record<string, unknown> {
  return getStandaloneProjectDocById("cosmo-fusion-dao");
}
