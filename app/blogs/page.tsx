import React from 'react';
import type { Metadata } from 'next';
import { BlogPageClient } from '../../src/components/pages/BlogPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('blog');

export default function BlogsPage() {
  return <BlogPageClient />;
}
