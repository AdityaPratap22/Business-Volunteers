import React from 'react';
import type { Metadata } from 'next';
import { IndustriesPageClient } from '../../../src/components/pages/IndustriesPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return constructNextMetadata('industries', slug);
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  return <IndustriesPageClient slug={slug} />;
}
