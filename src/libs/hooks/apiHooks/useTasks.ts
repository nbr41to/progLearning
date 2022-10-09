import type { Task } from 'src/types';

import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';

export const useTasks = () => {
  const { data, error, mutate } = useSWR<Task[]>('tasks/', axiosGetFetcher);

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
