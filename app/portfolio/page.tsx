import React from 'react';
import type { Metadata } from 'next';
import { PortfolioPageClient } from '../../src/components/pages/PortfolioPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('portfolio');

export default function Portfolio() {
  return <PortfolioPageClient />;
}
