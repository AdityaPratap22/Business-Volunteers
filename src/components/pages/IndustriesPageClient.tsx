'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { IndustriesPage } from '../../pages/IndustriesPage';

export const IndustriesPageClient: React.FC<{ slug?: string }> = ({ slug }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <IndustriesPage
      industryId={slug}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
