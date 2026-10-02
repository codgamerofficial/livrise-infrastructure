import { MetadataRoute } from 'next';
import { SEED_SERVICES } from '@/lib/seed-data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://livrise.in';

  const staticPages = [
    '',
    '/about',
    '/services',
    '/capabilities',
    '/projects',
    '/insights',
    '/contact',
    '/start-project',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const servicePages = SEED_SERVICES.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...servicePages];
}
