'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServicesPage } from '../../pages/ServicesPage';

export const ServicesPageClient: React.FC = () => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <ServicesPage
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
