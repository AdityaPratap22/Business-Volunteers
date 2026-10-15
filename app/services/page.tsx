import React from 'react';
import type { Metadata } from 'next';
import { ServicesPageClient } from '../../src/components/pages/ServicesPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('services');

export default function Services() {
  return <ServicesPageClient />;
}
