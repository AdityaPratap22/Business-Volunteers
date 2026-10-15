'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ServiceDetailPage } from '../../pages/ServiceDetailPage';
import { SERVICE_SLUG_TO_ID } from '../../utils/routes';

export const ServiceDetailPageClient: React.FC<{ id: string }> = ({ id }) => {
  const { navigate, openStrategyModal } = useApp();
  const normalizedId = SERVICE_SLUG_TO_ID[id?.toLowerCase()] || id;

  return (
    <ServiceDetailPage
      serviceId={normalizedId}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
