'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraphicItemDetailPage } from '../../pages/GraphicItemDetailPage';

export const GraphicItemDetailPageClient: React.FC<{ item: string }> = ({ item }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <GraphicItemDetailPage
      itemId={item}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
