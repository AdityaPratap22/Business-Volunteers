import React from 'react';
import type { Metadata } from 'next';
import { BlogPostPageClient } from '../../../src/components/pages/BlogPostPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;
  return constructNextMetadata('blog-post', fullSlug);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const fullSlug = Array.isArray(slug) ? slug.join('/') : slug;
  return <BlogPostPageClient slug={fullSlug} />;
}
