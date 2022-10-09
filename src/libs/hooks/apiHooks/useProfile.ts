import type { Profile } from 'src/types';

import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';

export const useProfile = () => {
  const { data, error, mutate } = useSWR<Profile>(
    'users/profile/',
    axiosGetFetcher
  );

  const refetch = async () => {
    await mutate();
  };

  return {
    profile: data,
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};
