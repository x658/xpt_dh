import FeaturedArticles from "@/components/home/FeaturedArticles";
import Hero from "@/components/home/Hero";
import ProductSubmission from "@/components/home/ProductSubmission";
import Showcase from "@/components/home/Showcase";
import { getPosts } from "@/lib/getBlogs";

export default async function HomeComponent({ locale = "en" }: { locale?: string }) {
  const { posts } = await getPosts(locale);
  const featuredPosts = posts.slice(0, 6);

  return (
    <>
      <Hero />
      <Showcase />
      <FeaturedArticles posts={featuredPosts} locale={locale} />
      <ProductSubmission />
    </>
  );
}
