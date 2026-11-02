'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { AboutUs } from '../AboutUs';
import type { LeaderPerson } from '../LeadershipModal';

interface AboutPageClientProps {
  slug?: string;
}

export const AboutPageClient: React.FC<AboutPageClientProps> = ({ slug }) => {
  const { navigate, openLeaderModal, openStrategyModal } = useApp();

  useEffect(() => {
    if (slug) {
      const lower = slug.toLowerCase();
      let person: LeaderPerson = null;
      if (lower.includes('co-founder') || lower.includes('cofounder') || lower.includes('khwahish') || lower.includes('creative')) {
        person = 'co-founder';
      } else if (lower.includes('founder') || lower.includes('harsh')) {
        person = 'founder';
      } else if (lower.includes('why') || lower.includes('diff')) {
        person = 'why-us';
      } else if (lower.includes('team') || lower.includes('crew') || lower.includes('specialist')) {
        person = 'team';
      }
      if (person) {
        openLeaderModal(person);
      }
    }
  }, [slug, openLeaderModal]);

  return (
    <AboutUs
      isStandalone={true}
      onNavigate={navigate}
      onOpenLeaderModal={openLeaderModal}
      onOpenStrategyModal={openStrategyModal}
    />
  );
};
