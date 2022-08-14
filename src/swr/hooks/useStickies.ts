import type { StickyWithDisplayName } from 'src/types';

import { useEffect } from 'react';
import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';
import { useAuth } from './useAuth';

export const useStickies = () => {
  const user = useAuth();
  const { data, error, mutate } = useSWR<StickyWithDisplayName[]>(
    'stickies/',
    user ? (url) => axiosGetFetcher(url, user?.uid) : null
  );

  useEffect(() => {
    mutate();
  }, [user, mutate]);

  const refetch = async () => {
    await mutate();
  };

  return {
    stickies: data || [],
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};
