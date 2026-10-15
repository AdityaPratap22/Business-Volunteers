import React from 'react';
import type { Metadata } from 'next';
import { SmmPageClient } from '../../src/components/pages/SmmPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('smm');

export default function Smm() {
  return <SmmPageClient />;
}
