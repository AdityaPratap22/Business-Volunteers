'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { Hero } from '../Hero';
import { InteractiveStatsBar } from '../InteractiveStatsBar';
import { WorkShowcaseMarquee } from '../WorkShowcaseMarquee';
import { AboutUs } from '../AboutUs';
import { ServicesGrid } from '../ServicesGrid';
import { WhyChooseUs } from '../WhyChooseUs';
import { ClientVoices } from '../ClientVoices';
import { LegalSection } from '../LegalSection';
import { ContactSection } from '../ContactSection';

export const HomePageClient: React.FC = () => {
  const {
    navigate,
    openStrategyModal,
    openLeaderModal,
    openStatModal,
    selectLocation,
    openContactModal,
  } = useApp();

  return (
    <>
      <Hero
        onOpenStatModal={openStatModal}
        onOpenStrategyModal={() => openStrategyModal()}
        onNavigateServices={() => navigate('services')}
        onNavigatePortfolio={() => navigate('portfolio')}
      />

      <div id="stats" style={{ backgroundColor: 'var(--bg-main)', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <InteractiveStatsBar
          onSelectLocation={selectLocation}
          onOpenStrategyModal={openStrategyModal}
        />
      </div>

      <ServicesGrid
        onOpenStrategyModal={openStrategyModal}
        onNavigate={navigate}
        backgroundColor="#FFFFFF"
      />

      <AboutUs
        onNavigate={navigate}
        onOpenLeaderModal={openLeaderModal}
        onOpenStrategyModal={openStrategyModal}
        onSelectLocation={selectLocation}
        backgroundColor="var(--bg-main)"
      />

      <ClientVoices backgroundColor="#FFFFFF" />

      <WorkShowcaseMarquee />

      <WhyChooseUs
        onSelectLocation={selectLocation}
        onOpenStrategyModal={openStrategyModal}
        backgroundColor="var(--bg-main)"
      />

      <LegalSection
        onOpenStrategyModal={openStrategyModal}
        isHomepage={true}
        onRedirectToLegal={() => navigate('legal')}
        backgroundColor="#F8FAFC"
        onOpenContactModal={(service) => openContactModal(service)}
      />

      <ContactSection
        backgroundColor="var(--bg-main)"
        onOpenContactModal={() => openContactModal()}
      />
    </>
  );
};
