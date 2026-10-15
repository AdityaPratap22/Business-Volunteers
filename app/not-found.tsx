import React from 'react';
import type { Metadata } from 'next';
import { NotFoundPageClient } from '../src/components/pages/NotFoundPageClient';

export const metadata: Metadata = {
  title: '404 — Page Not Found | Business Volunteers',
  description: 'The page you are looking for does not exist or has been moved.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return <NotFoundPageClient />;
}
