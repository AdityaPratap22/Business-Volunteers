'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ToolsPage } from '../../pages/ToolsPage';

export const ToolsPageClient: React.FC<{ slug?: string }> = ({ slug }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <ToolsPage
      toolSlug={slug}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
