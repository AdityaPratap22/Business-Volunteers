import React from 'react';
import type { Metadata } from 'next';
import { ToolsPageClient } from '../../src/components/pages/ToolsPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('tools');

export default function ToolsCatalogPage() {
  return <ToolsPageClient />;
}
