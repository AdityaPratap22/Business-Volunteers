'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { ContactSection } from '../ContactSection';

export const ContactPageClient: React.FC = () => {
  const { openContactModal } = useApp();
  return (
    <div style={{ paddingTop: '2rem', minHeight: '80vh' }}>
      <ContactSection
        isStandalone={true}
        backgroundColor="var(--bg-main)"
        onOpenContactModal={() => openContactModal()}
      />
    </div>
  );
};
