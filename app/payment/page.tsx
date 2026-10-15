import React from 'react';
import type { Metadata } from 'next';
import { PaymentPageClient } from '../../src/components/pages/PaymentPageClient';
import { constructNextMetadata } from '../../src/utils/nextMetadata';

export const metadata: Metadata = constructNextMetadata('payment');

export default function Payment() {
  return <PaymentPageClient />;
}
