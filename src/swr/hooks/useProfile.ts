import type { Profile } from 'src/types';

import { useEffect } from 'react';
import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';
import { useAuth } from './useAuth';

export const useProfile = () => {
  const user = useAuth();
  const { data, error, mutate } = useSWR<Profile>(
    'users/profile/',
    user ? (url) => axiosGetFetcher(url, user?.uid) : null,
    {}
  );

  useEffect(() => {
    mutate();
  }, [user, mutate]);

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
