import React from 'react';
import type { Metadata } from 'next';
import { AboutPageClient } from '../../src/components/pages/AboutPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('about');

export default function AboutPage() {
  return <AboutPageClient />;
}
