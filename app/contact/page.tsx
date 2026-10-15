import React from 'react';
import type { Metadata } from 'next';
import { ContactPageClient } from '../../src/components/pages/ContactPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('contact');

export default function ContactPage() {
  return <ContactPageClient />;
}
