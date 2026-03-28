import { useState } from "react";

/** Загрузка src из /public; при ошибке — fallback. */
export default function MediaImage({ src, alt, className, fallback }) {
  const [failed, setFailed] = useState(false);
  if (failed) return fallback;
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
