import { client } from '@/sanity/lib/client';

export interface SanityEvent {
  _id: string;
  name: string;
  date: string;
  endDate?: string;
  location: string;
  type: "race" | "ride" | "event";
  description: string;
  website: string;
  entryFee?: string;
  distance?: string;
  categories?: string;
  image?: any;
  active: boolean;
}

export async function getEvents(): Promise<SanityEvent[]> {
  try {
    return await client.fetch(`
      *[_type == "event" && active == true] | order(date asc) {
        _id,
        name,
        date,
        endDate,
        location,
        type,
        description,
        website,
        entryFee,
        distance,
        categories,
        image,
        active
      }
    `);
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}
