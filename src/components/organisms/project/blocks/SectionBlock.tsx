import { useProjectCatalog } from "../../../../context/ProjectCatalogContext";

export default function SectionBlock({ block }) {
  const { ui } = useProjectCatalog();
  let title = block.title;
  if (!title && block.sectionKey === "overview") title = ui.overview;
  if (!title && block.sectionKey === "technical") title = ui.deepDive;
  if (!title) title = "";
  if (!title) return null;
  return <h2 className="pd-section-title">{title}</h2>;
}
