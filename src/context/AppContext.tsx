'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { Currency, PageView } from '../types';
import type { StatType } from '../components/StatCardModal';
import type { LeaderPerson } from '../components/LeadershipModal';
import { getRoutePath, parseRoute } from '../utils/routes';

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  activePage: PageView;
  navigate: (page: PageView, slug?: string) => void;
  
  // Modals
  activeStatModal: StatType;
  openStatModal: (type: StatType) => void;
  closeStatModal: () => void;

  activeLeaderModal: LeaderPerson;
  openLeaderModal: (person: LeaderPerson) => void;
  closeLeaderModal: () => void;

  isStrategyModalOpen: boolean;
  strategyModalNote: string;
  openStrategyModal: (note?: string) => void;
  closeStrategyModal: () => void;

  isLocationsModalOpen: boolean;
  openLocationsModal: () => void;
  closeLocationsModal: () => void;

  isSearchModalOpen: boolean;
  openSearchModal: () => void;
  closeSearchModal: () => void;

  isContactModalOpen: boolean;
  contactModalService: string;
  openContactModal: (service?: string) => void;
  closeContactModal: () => void;

  selectLocation: (city: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [currency, setCurrency] = useState<Currency>('INR');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Modals state
  const [activeStatModal, setActiveStatModal] = useState<StatType>(null);
  const [activeLeaderModal, setActiveLeaderModal] = useState<LeaderPerson>(null);
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false);
  const [strategyModalNote, setStrategyModalNote] = useState<string>('');
  const [isLocationsModalOpen, setIsLocationsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactModalService, setContactModalService] = useState<string>('');

  const [activePage, setActivePage] = useState<PageView>('home');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const { page } = parseRoute(pathname || '/', window.location.search || '');
      setActivePage(page);
    }
  }, [pathname]);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', next);
    }
  };

  const navigate = (page: PageView, slug?: string) => {
    if (page === 'about' && slug) {
      const lower = slug.toLowerCase();
      if (lower.includes('co-founder') || lower.includes('cofounder') || lower.includes('khwahish') || lower.includes('creative')) {
        setActiveLeaderModal('co-founder');
      } else if (lower.includes('founder') || lower.includes('harsh')) {
        setActiveLeaderModal('founder');
      } else if (lower.includes('why') || lower.includes('diff')) {
        setActiveLeaderModal('why-us');
      } else if (lower.includes('team') || lower.includes('crew') || lower.includes('specialist')) {
        setActiveLeaderModal('team');
      }
    }
    const targetPath = getRoutePath(page, slug);
    router.push(targetPath);
  };

  const selectLocation = (city: string) => {
    setIsLocationsModalOpen(false);
    navigate('location', city);
  };

  const openStrategyModal = (note?: string) => {
    setStrategyModalNote(note || '');
    setIsStrategyModalOpen(true);
  };

  const closeStrategyModal = () => {
    setIsStrategyModalOpen(false);
    setStrategyModalNote('');
  };

  const openLeaderModal = (person: LeaderPerson) => setActiveLeaderModal(person);
  const closeLeaderModal = () => setActiveLeaderModal(null);

  const openStatModal = (type: StatType) => setActiveStatModal(type);
  const closeStatModal = () => setActiveStatModal(null);

  const openLocationsModal = () => setIsLocationsModalOpen(true);
  const closeLocationsModal = () => setIsLocationsModalOpen(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);

  const openContactModal = (service?: string) => {
    setContactModalService(service || '');
    setIsContactModalOpen(true);
  };
  const closeContactModal = () => {
    setIsContactModalOpen(false);
    setContactModalService('');
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        theme,
        toggleTheme,
        activePage,
        navigate,
        activeStatModal,
        openStatModal,
        closeStatModal,
        activeLeaderModal,
        openLeaderModal,
        closeLeaderModal,
        isStrategyModalOpen,
        strategyModalNote,
        openStrategyModal,
        closeStrategyModal,
        isLocationsModalOpen,
        openLocationsModal,
        closeLocationsModal,
        isSearchModalOpen,
        openSearchModal,
        closeSearchModal,
        isContactModalOpen,
        contactModalService,
        openContactModal,
        closeContactModal,
        selectLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
};
