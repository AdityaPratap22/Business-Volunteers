'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { GraphicDetailPage } from '../../pages/GraphicDetailPage';

export const GraphicDetailPageClient: React.FC<{ category: string }> = ({ category }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <GraphicDetailPage
      categoryId={category}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
