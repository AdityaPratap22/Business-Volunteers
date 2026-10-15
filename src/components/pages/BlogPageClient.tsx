'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPage } from '../../pages/BlogPage';

export const BlogPageClient: React.FC = () => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <BlogPage
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
