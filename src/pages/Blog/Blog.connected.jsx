import { useLingui } from "@lingui/react";
import { useLocale } from "../../i18n.jsx";
import { BLOG_CAT_KEYS, BLOG_CAT_MSG } from "./blogConstants.js";
import BlogView from "./Blog.view.jsx";
import { useBlogPage } from "./useBlogPage.js";

export default function BlogConnected() {
  const { locale } = useLocale();
  const { i18n } = useLingui();
  const blog = useBlogPage(locale);

  const catOptions = BLOG_CAT_KEYS.map((id) => ({
    id,
    label: i18n._(BLOG_CAT_MSG[id]),
  }));

  return <BlogView {...blog} catOptions={catOptions} />;
}
