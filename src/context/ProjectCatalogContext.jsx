import { createContext, useContext } from "react";

const ProjectCatalogContext = createContext(null);

/** @param {{ value: { project: object, ui: Record<string, string>, locale: string }, children: import("react").ReactNode }} props */
export function ProjectCatalogProvider({ value, children }) {
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
