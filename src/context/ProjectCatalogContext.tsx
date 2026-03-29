import { createContext, useContext, type ReactNode } from "react";

export type ProjectCatalogValue = {
  project: Record<string, unknown>;
  ui: Record<string, string>;
  locale: string;
};

const ProjectCatalogContext = createContext<ProjectCatalogValue | null>(null);

export function ProjectCatalogProvider({
  value,
  children,
}: {
  value: ProjectCatalogValue;
  children: ReactNode;
}) {
  return (
    <ProjectCatalogContext.Provider value={value}>
      {children}
    </ProjectCatalogContext.Provider>
  );
}

export function useProjectCatalog() {
  const v = useContext(ProjectCatalogContext);
  if (!v) {
    throw new Error("useProjectCatalog must be used within ProjectCatalogProvider");
  }
  return v;
}
