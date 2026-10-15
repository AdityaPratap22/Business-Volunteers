'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LegalDetailsPage } from '../../pages/LegalDetailsPage';

export const LegalPageClient: React.FC<{ slug?: string }> = ({ slug = 'legal-marketing' }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <LegalDetailsPage
      serviceTitle={slug}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
