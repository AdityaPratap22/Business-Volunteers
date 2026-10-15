'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { NotFoundPage } from '../../pages/NotFoundPage';

export const NotFoundPageClient: React.FC = () => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <NotFoundPage
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
