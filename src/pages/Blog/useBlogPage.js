import { useMemo, useState } from "react";
import { getBlogPosts } from "../../content/blog/index.js";

export function useBlogPage(locale) {
  const [active, setActive] = useState("All");
  const posts = useMemo(() => getBlogPosts(locale), [locale]);
  const filtered =
    active === "All" ? posts : posts.filter((p) => p.category === active);
  const published = posts.filter((p) => !p.draft).length;
  const drafts = posts.filter((p) => p.draft).length;
  const dateLocale = locale === "ru" ? "ru-RU" : "en-US";

  return {
    active,
    setActive,
    filtered,
    published,
    drafts,
    dateLocale,
  };
}
