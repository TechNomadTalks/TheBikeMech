import { client } from '@/sanity/lib/client';

export interface SanityService {
  _id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  fromPrice: boolean;
  icon: string;
}

export async function getServices(): Promise<SanityService[]> {
  return client.fetch(`
    *[_type == "service"] | order(price asc) {
      _id,
      name,
      price,
      description,
      features,
      popular,
      fromPrice,
      icon
    }
  `);
}
