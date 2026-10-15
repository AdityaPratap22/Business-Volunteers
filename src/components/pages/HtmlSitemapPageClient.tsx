'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { HtmlSitemapPage } from '../../pages/HtmlSitemapPage';

export const HtmlSitemapPageClient: React.FC = () => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <HtmlSitemapPage
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
