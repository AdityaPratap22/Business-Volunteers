import React from 'react';
import type { Metadata } from 'next';
import { AboutPageClient } from '../../../src/components/pages/AboutPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    { slug: 'founder' },
    { slug: 'co-founder' },
    { slug: 'why-us' },
    { slug: 'team' },
    { slug: 'harsh' },
    { slug: 'khwahish' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return constructNextMetadata('about', slug);
}

export default async function AboutSubPage({ params }: Props) {
  const { slug } = await params;
  return <AboutPageClient slug={slug} />;
}
