import useSWR from 'swr';

import { axiosGetFetcher } from './axiosFetcher';

export const useObjects = () => {
  const { data, error, mutate } = useSWR<any>(
    () => 'objects',
    axiosGetFetcher,
    {}
  );

  const refetch = async () => {
    await mutate();
  };

  return {
    objects: data || [],
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};
