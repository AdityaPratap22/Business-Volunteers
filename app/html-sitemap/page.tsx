import React from 'react';
import type { Metadata } from 'next';
import { HtmlSitemapPageClient } from '../../src/components/pages/HtmlSitemapPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('html-sitemap');

export default function HtmlSitemap() {
  return <HtmlSitemapPageClient />;
}
