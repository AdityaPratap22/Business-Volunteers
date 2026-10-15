import React from 'react';
import type { Metadata } from 'next';
import { GraphicItemDetailPageClient } from '../../../src/components/pages/GraphicItemDetailPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ item: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { item } = await params;
  return constructNextMetadata('design-item', item);
}

export default async function GraphicItemPage({ params }: Props) {
  const { item } = await params;
  return <GraphicItemDetailPageClient item={item} />;
}
