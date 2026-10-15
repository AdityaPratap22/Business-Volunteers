import React from 'react';
import type { Metadata } from 'next';
import { HomePageClient } from '../src/components/pages/HomePageClient';
import { constructNextMetadata } from '../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('home');

export default function HomePage() {
  return <HomePageClient />;
}
