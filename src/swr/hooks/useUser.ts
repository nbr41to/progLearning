import type { User } from 'src/types';

import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';
import { useAuth } from './useAuth';

export const useUser = () => {
  const user = useAuth();
  const { data, error } = useSWR<User>(
    () => `users/${user.uid}`,
    axiosGetFetcher,
    {}
  );

  return { user: data, error, isLoading: typeof data === 'undefined' };
};
