import AccentTag from "./AccentTag";
import { ACCENT_TAG_STYLES } from "./accentTag.styles";

export default (
  <>
    <style>{ACCENT_TAG_STYLES}</style>
    <div style={{ padding: 24, display: "flex", gap: 6, flexWrap: "wrap" }}>
      <AccentTag>React Native</AccentTag>
      <AccentTag>TypeScript</AccentTag>
    </div>
  </>
);
