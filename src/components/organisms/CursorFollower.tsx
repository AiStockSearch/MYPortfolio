export default function CursorFollower({ cursor, ring }) {
  return (
    <>
      <div className="cur" style={{ left: cursor.x, top: cursor.y }} />
      <div className="cur-r" style={{ left: ring.x, top: ring.y }} />
    </>
  );
}
