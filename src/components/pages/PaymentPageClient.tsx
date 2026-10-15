'use client';

import React from 'react';
import { useApp } from '../../context/AppContext';
import { PaymentPage } from '../../pages/PaymentPage';

export const PaymentPageClient: React.FC = () => {
  const { navigate, openContactModal } = useApp();
  return (
    <PaymentPage
      onNavigate={navigate}
      onOpenContactModal={() => openContactModal()}
    />
  );
};
