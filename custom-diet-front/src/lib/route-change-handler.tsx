'use client';

import { LOCAL_STORAGE } from '@/constants';
import {
  DIET_MANAGEMENT_URL,
  DIET_MANAGEMENT_URL_ALT,
  LOGIN_USER_URL
} from '@/constants/routes';
import useWait from '@/hooks/use-wait';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const RouteChangeHandler = () => {
  const pathname = usePathname(); // Get the current pathname
  const prevPathnameRef = useRef<string | null>(null); // Use a ref to store the previous pathname
  const { startWait, cancelWait } = useWait(500);

  const autoScrollTop = async () => {
    await startWait();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // Only store the previous pathname when the current pathname changes
    if (pathname) {
      // 👉 Scroll to top on route change
      autoScrollTop();

      if (prevPathnameRef.current) {
        // Store the previous pathname in localStorage
        const localLastPage = localStorage.getItem(LOCAL_STORAGE.LAST_PAGE);
        if (localLastPage === DIET_MANAGEMENT_URL_ALT) {
          localStorage.setItem(LOCAL_STORAGE.LAST_PAGE, DIET_MANAGEMENT_URL);
        } else {
          localStorage.setItem(
            LOCAL_STORAGE.LAST_PAGE,
            prevPathnameRef.current
          );
        }
      }
      // Update the ref to the current pathname (to become the previous one on the next change)
      prevPathnameRef.current = pathname;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]); // Trigger whenever the pathname changes

  useEffect(() => {
    return () => {
      cancelWait();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null; // No UI, just logic
};

export default RouteChangeHandler;
