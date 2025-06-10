'use client';

import { useEffect } from 'react';

export const useWindowListener = (type: string, listener: () => void) => {
  useEffect(() => {
    listener();
    window.addEventListener(type, listener);

    return () => {
      window.removeEventListener(type, listener);
    };
  }, [type, listener]);
};
