import type { Task } from 'src/types';

import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';
import { useAuth } from './useAuth';

export const useTasks = () => {
  const user = useAuth();
  const { data, error, mutate } = useSWR<Task[]>(
    () => `tasks/${user.uid}`,
    axiosGetFetcher,
    {}
  );

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
