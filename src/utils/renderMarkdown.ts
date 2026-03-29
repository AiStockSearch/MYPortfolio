export function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Markdown transforms on segments that are NOT inside ``` fences. */
function renderMarkdownSegment(text) {
  return text
    .replace(/## (.+)/g, "<h2>$1</h2>")
    .replace(/### (.+)/g, "<h3>$1</h3>")
    .replace(
      /\[([^\]]+)\]\((\/[^)\s]+)\)/g,
      (_, label, path) =>
        `<a href="${escapeHtml(path)}">${escapeHtml(label)}</a>`
    )
    .replace(
      /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
      (_, label, href) =>
        `<a href="${escapeHtml(href)}" rel="noopener noreferrer" target="_blank">${escapeHtml(
          label
        )}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`([^`\n]+)`/g, "<code>$1</code>")
    .replace(/^- (.+)/gm, "<li>$1</li>")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[hpl])(.+)/gm, (m) => (m.trim() ? m : ""));
}

export function renderMarkdown(text) {
  if (!text) return "";
  const parts = text.split(/(```(?:\w*\n)?[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        const m = part.match(/^```(\w*)\n?([\s\S]*?)```$/);
        const inner = m ? m[2] : part.slice(3, -3);
        const esc = escapeHtml(inner);
        return `<pre><code>${esc}</code></pre>`;
      }
      return renderMarkdownSegment(part);
    })
    .join("");
}
