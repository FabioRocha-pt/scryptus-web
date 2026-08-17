import type { MetadataRoute } from 'next';
import { fetchContent } from '@/sanity/lib/fetchContent';
import { AREAS_QUERY, type SanityArea } from '@/sanity/lib/queries';
import { AREA_SLUGS } from './content/areas';
import { SITE_URL } from './content/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await fetchContent<(SanityArea | null)[]>(AREAS_QUERY);
  const doSanity = (docs ?? []).map((d) => d?.slug).filter((s): s is string => Boolean(s));
  const slugs = Array.from(new Set([...AREA_SLUGS, ...doSanity]));
  const agora = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: agora, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/empresa`, lastModified: agora, changeFrequency: 'yearly', priority: 0.8 },
    {
      url: `${SITE_URL}/portefolio`,
      lastModified: agora,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/contactos`,
      lastModified: agora,
      changeFrequency: 'yearly',
      priority: 0.9,
    },
    ...slugs.map((slug) => ({
      url: `${SITE_URL}/areas/${slug}`,
      lastModified: agora,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${SITE_URL}/privacidade`,
      lastModified: agora,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
