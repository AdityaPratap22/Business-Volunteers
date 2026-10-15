import React from 'react';
import type { Metadata } from 'next';
import { GraphicDetailPageClient } from '../../../src/components/pages/GraphicDetailPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  return constructNextMetadata('graphic-details', category);
}

export default async function GraphicCategoryPage({ params }: Props) {
  const { category } = await params;
  return <GraphicDetailPageClient category={category} />;
}
