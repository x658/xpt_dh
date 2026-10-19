import { Link as I18nLink } from "@/i18n/routing";
import { BlogPost } from "@/types/blog";
import dayjs from "dayjs";
import { ArrowRight, BookOpen, Calendar, Tag } from "lucide-react";
import { useTranslations } from "next-intl";

interface FeaturedArticlesProps {
  posts: BlogPost[];
  locale: string;
}

export default function FeaturedArticles({ posts, locale }: FeaturedArticlesProps) {
  const t = useTranslations("FeaturedArticles");

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-200/60 dark:border-slate-800">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Technical Architecture & Guides</span>
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-gray-100 sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <I18nLink
            key={post.slug}
            href={`/blog${post.slug}`}
            prefetch={false}
            className="group flex flex-col p-6 bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700/80 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-3">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {dayjs(post.date).format("YYYY-MM-DD")}
              </span>
              {post.pin && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  PINNED
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
              {post.title}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 flex-grow leading-relaxed">
              {post.description}
            </p>

            {post.tags && (
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-700/50 mt-auto">
                {post.tags.split(",").slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300"
                  >
                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                    {tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </I18nLink>
        ))}
      </div>

      <div className="mt-12 text-center">
        <I18nLink
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition-all shadow-sm hover:shadow"
        >
          <span>{t("viewAll")}</span>
          <ArrowRight className="w-4 h-4" />
        </I18nLink>
      </div>
    </section>
  );
}
