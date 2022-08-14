import type { Task } from 'src/types';

import { useEffect } from 'react';
import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';
import { useAuth } from './useAuth';

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
    tasks: data || [],
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};