import { renderMarkdown } from "../../../../utils/renderMarkdown";

export default function ProseBlock({ block }) {
  const text = typeof block.text === "string" ? block.text : "";
  if (!text.trim()) return null;
  return (
    <div
      className="pd-prose"
      dangerouslySetInnerHTML={{
        __html: renderMarkdown(text),
      }}
    />
  );
}
