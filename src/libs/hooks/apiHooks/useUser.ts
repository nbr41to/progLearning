import type { User } from 'src/types';

import { useCallback, useEffect } from 'react';
import useSWR from 'swr';

import { useAuth } from '../stateHooks/useAuth';
import { useLoading } from '../stateHooks/useLoading';
import { axiosGetFetcher } from './axiosFetcher';

export const useUser = () => {
  const user = useAuth();
  const [, setIsLoading] = useLoading();

  const { data, error, mutate } = useSWR<User>(
    'users/me/',
    user ? axiosGetFetcher : null,
    {}
  );

  useEffect(() => {
    if (!user) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [user, setIsLoading]);

  const refetch = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return { user: data, error, isLoading: typeof data === 'undefined', refetch };
};
