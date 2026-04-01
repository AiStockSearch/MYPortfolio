export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Inline markdown: links, bold, italic, code (code first so backticks win over emphasis). */
export function renderInline(text: string) {
  return text
    .replace(/`([^`\n]+)`/g, (_, code) => `<code>${escapeHtml(code)}</code>`)
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
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function isTableSeparatorRow(line: string) {
  const t = line.replace(/\s/g, "");
  return /^\|?[-:|]+\|?$/.test(t) && t.includes("---");
}

/** Разбор ячеек; `\|` внутри ячейки — литеральная черта, не разделитель. */
function parseTableRow(line: string) {
  const trimmed = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  const cells: string[] = [];
  let cur = "";
  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (ch === "|") {
      if (cur.endsWith("\\")) {
        cur = cur.slice(0, -1) + "|";
      } else {
        cells.push(cur.trim());
        cur = "";
      }
    } else {
      cur += ch;
    }
  }
  cells.push(cur.trim());
  return cells;
}

function renderMarkdownTable(rowLines: string[]) {
  const rows = rowLines.filter((l) => l.trim().startsWith("|"));
  if (rows.length === 0) return "";
  const header = parseTableRow(rows[0]);
  let bodyStart = 1;
  if (rows.length > 1 && isTableSeparatorRow(rows[1])) bodyStart = 2;
  const thead = `<thead><tr>${header.map((c) => `<th>${renderInline(c)}</th>`).join("")}</tr></thead>`;
  const tbodyRows = rows
    .slice(bodyStart)
    .filter((r) => r.includes("|") && !isTableSeparatorRow(r))
    .map((r) => {
      const cells = parseTableRow(r);
      return `<tr>${cells.map((c) => `<td>${renderInline(c)}</td>`).join("")}</tr>`;
    })
    .join("");
  return `<div class="bp-table-wrap"><table class="bp-md-table">${thead}<tbody>${tbodyRows}</tbody></table></div>`;
}

function splitProseIntoBlocks(text: string) {
  const normalized = text.replace(/\r\n/g, "\n").trim();
  if (!normalized) return [];
  return normalized.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
}

function renderProseBlock(block: string) {
  const rawLines = block.split("\n");
  const lines = rawLines.map((l) => l.trimEnd());
  const nonEmpty = lines.map((l) => l.trim()).filter(Boolean);
  if (nonEmpty.length === 0) return "";

  const first = nonEmpty[0];

  if (nonEmpty.length === 1 && /^[-*]{3,}\s*$/.test(first)) {
    return '<hr class="bp-hr" />';
  }

  if (first.startsWith("|")) {
    const tableLines = lines.filter((l) => l.trim().startsWith("|"));
    return renderMarkdownTable(tableLines);
  }

  if (first.startsWith("### ")) {
    return `<h3>${renderInline(first.slice(4))}</h3>`;
  }
  if (first.startsWith("## ")) {
    return `<h2>${renderInline(first.slice(3))}</h2>`;
  }
  if (first.startsWith("# ") && !first.startsWith("##")) {
    return `<h2>${renderInline(first.slice(2))}</h2>`;
  }

  if (nonEmpty.every((l) => /^-\s+/.test(l))) {
    const items = nonEmpty.map((l) => l.replace(/^-\s+/, ""));
    return `<ul>${items.map((it) => `<li>${renderInline(it)}</li>`).join("")}</ul>`;
  }

  if (nonEmpty.every((l) => /^\d+\.\s+/.test(l))) {
    const items = nonEmpty.map((l) => l.replace(/^\d+\.\s+/, ""));
    return `<ol>${items.map((it) => `<li>${renderInline(it)}</li>`).join("")}</ol>`;
  }

  const paragraphLines = lines
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const withBreaks = paragraphLines.map((l) => renderInline(l)).join("<br />");
  return `<p>${withBreaks}</p>`;
}

function renderProse(text: string) {
  return splitProseIntoBlocks(text).map(renderProseBlock).join("");
}

export function renderMarkdown(text: string) {
  if (!text) return "";
  const parts = text.split(/(```[\w]*\n?[\s\S]*?```)/g);
  return parts
    .map((part) => {
      if (!part.startsWith("```")) return renderProse(part);
      const m = part.match(/^```(\w*)\n?([\s\S]*?)```$/);
      const lang = (m?.[1] ?? "").trim().toLowerCase();
      const inner = m ? m[2] : part.slice(3, -3);
      const esc = escapeHtml(inner);
      if (lang === "mermaid") {
        return `<aside class="bp-diagram bp-diagram-mermaid" aria-label="Mermaid diagram"><div class="bp-diagram-cap">Mermaid</div><pre class="bp-diagram-code"><code>${esc}</code></pre></aside>`;
      }
      return `<pre><code>${esc}</code></pre>`;
    })
    .join("");
}
