import { client } from '@/sanity/lib/client';

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
  featured: boolean;
}

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  return client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      category,
      author,
      publishedAt,
      readTime,
      featured
    }
  `);
}
