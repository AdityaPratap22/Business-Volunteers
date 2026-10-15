'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LocationPage } from '../../pages/LocationPage';

export const LocationPageClient: React.FC<{ city: string }> = ({ city }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <LocationPage
      locationName={city}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
