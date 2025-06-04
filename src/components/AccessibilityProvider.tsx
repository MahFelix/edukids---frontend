// src/components/AccessibilityProvider.tsx
import React, { useEffect } from 'react';
import type { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import axe from '@axe-core/react';

const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (import.meta.env.MODE !== 'production') {
      axe(React, ReactDOM, 1000);
    }
  }, []);

  return <>{children}</>;
};

export default AccessibilityProvider;