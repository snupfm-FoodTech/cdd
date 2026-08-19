'use client';

import { LOCAL_STORAGE } from '@/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

interface UseDynamicPaginationProps<T> {
  initialSearchParams: T;
  pageSize: number;
}

interface UseDynamicPaginationReturn<T> {
  pagination: PaginationState;
  searchCriteria: T;
  handleSearch: (params: T) => void;
  updatePaginationState: (
    updater: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => void;
}

export function useDynamicPagination<T>({
  initialSearchParams,
  pageSize
}: UseDynamicPaginationProps<T>): UseDynamicPaginationReturn<T> {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: parseInt(searchParams.get('page') || '1', 10) - 1,
    pageSize
  });

  const [searchCriteria, setSearchCriteria] = useState<T>({
    ...initialSearchParams,
    ...Object.fromEntries(searchParams.entries()) // Spread query parameters into search criteria
  });

  const updateURL = (params: any, pageIndex: number) => {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.set(key, value as string);
    });
    queryParams.set('page', (pageIndex + 1).toString());
    const newURL = `?${queryParams.toString()}`;

    // Using router.push by setTimeout to avoid conflict with render
    setTimeout(() => {
      router.push(newURL, {
        scroll: false
      });
      updateLocalStorage(`${pathname}${newURL}`);
    }, 0);
  };

  const handleSearch = (params: T) => {
    setSearchCriteria(params);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    updateURL(params, 0);
  };

  const updatePaginationState = (
    updater: PaginationState | ((prev: PaginationState) => PaginationState)
  ) => {
    setPagination((old) => {
      const newState = typeof updater === 'function' ? updater(old) : updater;
      updateURL(searchCriteria, newState.pageIndex);
      return newState;
    });
  };

  const updateLocalStorage = (newURL: string) => {
    const urlsHistory = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE.URLS_HISTORY) || '[]'
    );

    // Extract base path from newURL (without parameters)
    const newURLBase = newURL.split('?')[0];
    const existingIndex = urlsHistory.findIndex(
      (storedURL: string) => storedURL.split('?')[0] === newURLBase
    );

    if (existingIndex !== -1) {
      // If base path exists, update with the latest newURL (with updated parameters)
      urlsHistory[existingIndex] = newURL;
    } else {
      // If base path doesn't exist, push newURL into history
      urlsHistory.push(newURL);
    }

    // Update localStorage with the modified urlsHistory
    localStorage.setItem(
      LOCAL_STORAGE.URLS_HISTORY,
      JSON.stringify(urlsHistory)
    );
  };

  useEffect(() => {
    const pageFromParams = parseInt(searchParams.get('page') || '1', 10) - 1;
    setPagination((prev) => ({
      ...prev,
      pageIndex: pageFromParams
    }));
    setSearchCriteria((prev) => ({
      ...prev,
      ...Object.fromEntries(searchParams.entries())
    }));

    // Construct the new URL string with current search parameters
    const newURL = `?${searchParams.toString()}`;
    updateLocalStorage(`${pathname}${newURL}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    pagination,
    searchCriteria,
    handleSearch,
    updatePaginationState
  };
}
