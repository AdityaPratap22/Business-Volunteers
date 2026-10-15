import React from 'react';
import type { Metadata } from 'next';
import { LegalPageClient } from '../../../src/components/pages/LegalPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;
  return constructNextMetadata('legal-details', fullSlug);
}

export default async function LegalDetailsDynamicPage({ params }: Props) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;
  return <LegalPageClient slug={fullSlug} />;
}
