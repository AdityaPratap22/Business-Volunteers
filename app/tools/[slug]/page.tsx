import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';
import { ALL_TOOLS, getToolById } from '../../../src/data/toolsData';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ALL_TOOLS.map(tool => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return constructNextMetadata('tools', slug);
}

export default async function DedicatedToolPage({ params }: Props) {
  const { slug } = await params;
  const tool = getToolById(slug);
  const targetSlug = tool?.slug || slug;

  // Build JSON-LD for server-side rendering at canonical URL
  const canonicalUrl = `https://businessvolunteers.online/tools/${targetSlug}`;
  const toolName = tool?.name ?? targetSlug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const toolDesc = tool?.description ?? `Free online ${toolName} tool by Business Volunteers.`;
  const toolKeywords = tool?.keywords ?? [targetSlug];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}#webapp`,
        name: toolName,
        description: toolDesc,
        url: canonicalUrl,
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web Browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        provider: {
          '@type': 'Organization',
          '@id': 'https://businessvolunteers.online/#organization',
          name: 'Business Volunteers',
          url: 'https://businessvolunteers.online',
        },
        keywords: toolKeywords.join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://businessvolunteers.online' },
          { '@type': 'ListItem', position: 2, name: 'Free Tools', item: 'https://businessvolunteers.online/tools' },
          { '@type': 'ListItem', position: 3, name: toolName, item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Redirect to the standalone tool page */}
      {redirect(`/tools-standalone/${targetSlug}.html`)}
    </>
  );
}
