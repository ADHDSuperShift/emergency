import React from 'react';
import AppLayout from '@/components/AppLayout.jsx';
import { AppProvider } from '@/contexts/AppContext.jsx';

const Index = () => {
  return (
    <AppProvider>
      <AppLayout />
    </AppProvider>
  );
};

export default Index;