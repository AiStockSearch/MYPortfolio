import { parse } from "yaml";
import {
  PROJECT_CATALOG_ORDER,
  type ProjectCatalogOrderKey,
} from "./projectCatalogOrder";

type StandaloneProjectYaml = {
  catalogOrderKey: ProjectCatalogOrderKey;
  id: string;
  live: boolean;
  featured?: boolean;
  stack: string[];
  catalogFilters?: string[];
  i18n: Record<string, unknown>;
};

/** YAML в `yaml/projects/*.yaml`: без поля `order` — подставляется по `catalogOrderKey`. */
export function resolveStandaloneProjectDoc(rawYaml: string): Record<string, unknown> {
  const data = parse(rawYaml) as StandaloneProjectYaml;
  return {
    id: data.id,
    order: PROJECT_CATALOG_ORDER[data.catalogOrderKey],
    live: data.live,
    featured: data.featured ?? false,
    stack: data.stack,
    ...(Array.isArray(data.catalogFilters) && data.catalogFilters.length
      ? { catalogFilters: data.catalogFilters }
      : {}),
    i18n: data.i18n,
  };
}
