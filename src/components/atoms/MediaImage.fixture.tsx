import MediaImage from "./MediaImage";

export default {
  Default: (
    <div style={{ padding: 24, maxWidth: 320 }}>
      <MediaImage
        src="/favicon.svg"
        alt="Test"
        className=""
        fallback={<span style={{ color: "var(--muted)" }}>Fallback</span>}
      />
    </div>
  ),
  BrokenSrc: (
    <div style={{ padding: 24 }}>
      <MediaImage
        src="/nonexistent-image-xyz.png"
        alt="Missing"
        className=""
        fallback={
          <div
            style={{
              padding: 40,
              border: "1px dashed var(--border)",
              color: "var(--muted)",
              textAlign: "center",
            }}
          >
            Placeholder
          </div>
        }
      />
    </div>
  ),
};
