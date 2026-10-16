import React from 'react';
import type { Metadata } from 'next';
import { LegalPageClient } from '../../src/components/pages/LegalPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('legal');

export default function LegalPage() {
  return <LegalPageClient />;
}
