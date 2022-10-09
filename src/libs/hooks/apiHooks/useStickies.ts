import type { StickyWithDisplayName } from 'src/types';

import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';

export const useStickies = () => {
  const { data, error, mutate } = useSWR<StickyWithDisplayName[]>(
    'stickies/',
    axiosGetFetcher
  );

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
