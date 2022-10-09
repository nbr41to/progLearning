import type { Task } from 'src/types';

import { useEffect } from 'react';
import useSWR from 'swr';

import { useAuth } from '../stateHooks/useAuth';
import { axiosGetFetcher } from './axiosFetcher';

export const useTasks = () => {
  const user = useAuth();
  const { data, error, mutate } = useSWR<Task[]>(
    'tasks/',
    user ? (url) => axiosGetFetcher(url, user?.uid) : null
  );

  useEffect(() => {
    mutate();
  }, [user, mutate]);

  const refetch = async () => {
    await mutate();
  };

  return {
    tasks:
      data
        ?.sort((a, b) => {
          if (a.createdAt < b.createdAt) return 1;
          if (a.createdAt > b.createdAt) return -1;

          return 0;
        })
        .sort((a, b) => {
          if (a.done && !b.done) return 1;
          if (!a.done && b.done) return -1;

          return 0;
        }) || [],
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};
