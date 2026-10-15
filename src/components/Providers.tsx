'use client';

import React from 'react';
import { AppProvider } from '../context/AppContext';
import { AppShell } from './AppShell';

export const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppProvider>
      <AppShell>
        {children}
      </AppShell>
    </AppProvider>
  );
};
