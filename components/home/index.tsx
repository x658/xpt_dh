import FAQSection from "@/components/home/FAQSection";
import FeaturedArticles from "@/components/home/FeaturedArticles";
import Hero from "@/components/home/Hero";
import PlatformPillars from "@/components/home/PlatformPillars";
import ProductSubmission from "@/components/home/ProductSubmission";
import QuickToolsTeaser from "@/components/home/QuickToolsTeaser";
import Showcase from "@/components/home/Showcase";
import { getPosts } from "@/lib/getBlogs";

export default async function HomeComponent({ locale = "en" }: { locale?: string }) {
  const { posts } = await getPosts(locale);
  const featuredPosts = posts.slice(0, 6);

  return (
    <>
      <Hero />
      <QuickToolsTeaser locale={locale} />
      <FeaturedArticles posts={featuredPosts} locale={locale} />
      <PlatformPillars locale={locale} />
      <Showcase />
      <FAQSection locale={locale} />
      <ProductSubmission />
    </>
  );
}
