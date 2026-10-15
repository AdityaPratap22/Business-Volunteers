import React from 'react';
import type { Metadata } from 'next';
import { ServiceDetailPageClient } from '../../../src/components/pages/ServiceDetailPageClient';
import { constructNextMetadata } from '../../../src/utils/nextMetadata';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return constructNextMetadata('service-details', id);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  return <ServiceDetailPageClient id={id} />;
}
