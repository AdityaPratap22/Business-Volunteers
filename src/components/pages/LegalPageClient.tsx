'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LegalSection } from '../LegalSection';
import { LegalDetailsPage } from '../../pages/LegalDetailsPage';

export const LegalPageClient: React.FC<{ slug?: string }> = ({ slug }) => {
  const { navigate, openStrategyModal, openContactModal } = useApp();

  if (slug && slug !== 'legal' && slug !== 'legal-marketing') {
    return (
      <LegalDetailsPage
        serviceTitle={slug}
        onNavigate={navigate}
        onOpenStrategyModal={openStrategyModal}
      />
    );
  }

  return (
    <LegalSection
      onOpenStrategyModal={openStrategyModal}
      isHomepage={false}
      backgroundColor="#F8FAFC"
      onOpenContactModal={openContactModal}
    />
  );
};
