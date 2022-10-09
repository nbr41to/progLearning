import type { BattleObject } from 'src/types';

import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';

export const useCurrentBoss = () => {
  const { data, error, mutate } = useSWR<BattleObject>(
    () => 'objects',
    axiosGetFetcher,
    {}
  );

  const refetch = async () => {
    await mutate();
  };

  return {
    boss: data,
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};
