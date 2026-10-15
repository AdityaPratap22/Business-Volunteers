'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { LocationsDirectoryPage } from '../../pages/LocationsDirectoryPage';

export const LocationsDirectoryPageClient: React.FC = () => {
  const { navigate, selectLocation } = useApp();
  return (
    <LocationsDirectoryPage
      onNavigate={navigate}
      onSelectLocation={selectLocation}
    />
  );
};
