import React from 'react';
import type { Metadata } from 'next';
import { LocationsDirectoryPageClient } from '../../src/components/pages/LocationsDirectoryPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('all-locations');

export default function DigitalMarketingLocationsPage() {
  return <LocationsDirectoryPageClient />;
}
