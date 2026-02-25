import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "your-project-id",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

export interface Service {
  _id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  fromPrice: boolean;
}

export interface BlogPost {
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

export interface GalleryImage {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: any;
}

export async function getServices() {
  const query = \`*[_type == "service"] | order(price asc)\`;
  return sanityClient.fetch(query);
}

export async function getBlogPosts() {
  const query = \`*[_type == "blogPost"] | order(publishedAt desc)\`;
  return sanityClient.fetch(query);
}

export async function getGalleryImages() {
  const query = \`*[_type == "galleryImage"] | order(_createdAt desc)\`;
  return sanityClient.fetch(query);
}
