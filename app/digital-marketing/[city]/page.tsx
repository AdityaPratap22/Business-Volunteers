import React from 'react';
import type { Metadata } from 'next';
import { LocationPageClient } from '../../../src/components/pages/LocationPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ city: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  return constructNextMetadata('location', city);
}

export default async function LocationCityPage({ params }: Props) {
  const { city } = await params;
  return <LocationPageClient city={city} />;
}
