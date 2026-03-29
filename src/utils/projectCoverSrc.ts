/** Обложка проекта в `public/projects/` (SVG по умолчанию — вектор, легко заменить на PNG). */
export function projectCoverSrc(projectId: string): string {
  return `/projects/${projectId}.svg`;
}
