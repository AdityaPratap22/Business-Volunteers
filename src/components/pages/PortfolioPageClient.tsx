'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PortfolioPage } from '../../pages/PortfolioPage';

export const PortfolioPageClient: React.FC = () => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <PortfolioPage
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
