import { resolveStandaloneProjectDoc } from "./resolveStandaloneProjectDoc";

const rawModules = import.meta.glob<string>("./yaml/projects/*.yaml", {
  eager: true,
  query: "?raw",
  import: "default",
});

function loadDocsById(): Record<string, Record<string, unknown>> {
  const out: Record<string, Record<string, unknown>> = {};
  for (const content of Object.values(rawModules)) {
    const doc = resolveStandaloneProjectDoc(content);
    out[doc.id as string] = doc;
  }
  return out;
}

const docsById = loadDocsById();

export function getStandaloneProjectDocById(id: string): Record<string, unknown> {
  const doc = docsById[id];
  if (!doc) {
    throw new Error(`Unknown standalone project id: ${id}`);
  }
  return doc;
}

/** Все кейсы из `yaml/projects/*.yaml`, отсортированные по `order` (каталог). */
export function getStandaloneProjectDocsSorted(): Record<string, unknown>[] {
  return Object.values(docsById).sort(
    (a, b) => (a.order as number) - (b.order as number)
  );
}
