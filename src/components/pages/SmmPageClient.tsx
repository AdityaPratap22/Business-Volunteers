'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { SmmPage } from '../../pages/SmmPage';

export const SmmPageClient: React.FC = () => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <SmmPage
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
