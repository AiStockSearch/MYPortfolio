import { useParams } from "react-router-dom";
import { getAdjacentPosts, getBlogPost } from "../../content/blog/index";
import { useLocale } from "../../i18n";
import BlogPostNotFoundView from "./BlogPostNotFound.view";
import BlogPostView from "./BlogPost.view";

export default function BlogPostConnected() {
  const { id = "" } = useParams();
  const { locale } = useLocale();
  const post = getBlogPost(id, locale);
  const { prev, next } = getAdjacentPosts(id, locale);
  const dateLocale = locale === "ru" ? "ru-RU" : "en-US";

  if (!post) {
    return <BlogPostNotFoundView />;
  }

  return (
    <BlogPostView post={post} prev={prev} next={next} dateLocale={dateLocale} />
  );
}
