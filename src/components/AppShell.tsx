'use client';

import React from 'react';
import { useApp } from '../context/AppContext';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingSocials } from './FloatingSocials';
import { SectionNavigator } from './SectionNavigator';
import { LocationsModal } from './LocationsModal';
import { StatCardModal } from './StatCardModal';
import { LeadershipModal } from './LeadershipModal';
import { StrategyModal } from './StrategyModal';
import { GlobalSearchModal } from './GlobalSearchModal';
import { ContactFormModal } from './ContactFormModal';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activePage,
    navigate,
    currency,
    setCurrency,
    theme,
    toggleTheme,
    activeStatModal,
    closeStatModal,
    openStrategyModal,
    activeLeaderModal,
    closeLeaderModal,
    isStrategyModalOpen,
    strategyModalNote,
    closeStrategyModal,
    isLocationsModalOpen,
    closeLocationsModal,
    selectLocation,
    isSearchModalOpen,
    closeSearchModal,
    isContactModalOpen,
    contactModalService,
    closeContactModal,
    openContactModal,
    openLocationsModal,
    openLeaderModal,
  } = useApp();

  return (
    <div className="app" data-theme={theme}>
      {/* HEADER NAVIGATION */}
      <Header
        activePage={activePage}
        onNavigate={navigate}
        currency={currency}
        onCurrencyChange={setCurrency}
        theme={theme}
        onThemeToggle={toggleTheme}
        onOpenStrategyModal={() => openStrategyModal()}
        onOpenLeaderModal={openLeaderModal}
      />

      {/* MAIN CONTENT INJECTION */}
      <main id="main">
        {children}
      </main>

      {/* FOOTER */}
      <Footer
        onNavigate={navigate}
        onSelectLocation={selectLocation}
        onOpenLocationsModal={openLocationsModal}
        onOpenContactModal={() => openContactModal()}
      />

      {/* MODALS */}
      <LocationsModal
        isOpen={isLocationsModalOpen}
        onClose={closeLocationsModal}
        onSelectLocation={selectLocation}
      />

      <StatCardModal
        statType={activeStatModal}
        onClose={closeStatModal}
        onOpenStrategyModal={openStrategyModal}
      />

      <LeadershipModal
        person={activeLeaderModal}
        onClose={closeLeaderModal}
        onOpenStrategyModal={openStrategyModal}
        onNavigate={navigate}
      />

      <StrategyModal
        isOpen={isStrategyModalOpen}
        onClose={closeStrategyModal}
        planName={strategyModalNote}
      />

      <GlobalSearchModal
        isOpen={isSearchModalOpen}
        onClose={closeSearchModal}
      />

      <FloatingSocials />

      <SectionNavigator activePage={activePage} />

      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={closeContactModal}
        prefilledService={contactModalService}
      />
    </div>
  );
};
