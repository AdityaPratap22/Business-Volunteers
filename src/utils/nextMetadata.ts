import type { Metadata } from 'next';
import type { PageView } from '../types';
import { resolveSeoMetadata, type SeoDynamicContext } from './seoManager';

export function constructNextMetadata(page: PageView, slug?: string, context?: SeoDynamicContext): Metadata {
  const { seo, canonicalUrl } = resolveSeoMetadata(page, slug, context);
  const logoUrl = 'https://businessvolunteers.online/businessvolunteers/logo.png';

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: 'Business Volunteers',
      images: [
        {
          url: logoUrl,
          width: 512,
          height: 512,
          alt: 'Business Volunteers Logo',
        },
      ],
      type: (seo.ogType as any) || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [logoUrl],
    },
  };
}
