'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { BlogPostPage } from '../../pages/BlogPostPage';

export const BlogPostPageClient: React.FC<{ slug: string }> = ({ slug }) => {
  const { navigate, openStrategyModal } = useApp();
  return (
    <BlogPostPage
      slug={slug}
      onNavigate={navigate}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
