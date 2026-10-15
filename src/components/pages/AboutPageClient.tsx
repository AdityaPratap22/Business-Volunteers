'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { AboutUs } from '../AboutUs';

export const AboutPageClient: React.FC = () => {
  const { navigate, openLeaderModal, openStrategyModal } = useApp();
  return (
    <AboutUs
      isStandalone={true}
      onNavigate={navigate}
      onOpenLeaderModal={openLeaderModal}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
