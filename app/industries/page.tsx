import React from 'react';
import type { Metadata } from 'next';
import { IndustriesPageClient } from '../../src/components/pages/IndustriesPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('industries');

export default function Industries() {
  return <IndustriesPageClient />;
}
