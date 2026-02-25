import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

export interface SanityGalleryImage {
  _id: string;
  title: string;
  category: string;
  description: string;
  image: any;
  imageUrl?: string;
}

export async function getGalleryImages(): Promise<SanityGalleryImage[]> {
  const images = await client.fetch(`
    *[_type == "galleryImage"] | order(_createdAt desc) {
      _id,
      title,
      category,
      description,
      image
    }
  `);
  
  return images.map((img: any) => ({
    ...img,
    imageUrl: img.image ? urlFor(img.image).width(800).height(800).url() : null,
  }));
}
