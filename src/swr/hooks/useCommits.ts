import axios from 'axios';
import { useEffect } from 'react';
import useSWR from 'swr';

import { useAuth } from './useAuth';

export const useCommits = () => {
  const user = useAuth();
  const { data, error, mutate } = useSWR(
    () =>
      ` https://pixe.la/v1/users/${user?.uid.toLocaleLowerCase()}/graphs/${user?.uid
        .toLocaleLowerCase()
        .substring(0, 16)}/pixels?withBody=true`,
    user
      ? (url) =>
          axios.get(url, {
            headers: {
              'X-USER-TOKEN': user?.uid,
            },
          })
      : null,
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
    }
  );

  useEffect(() => {
    mutate();
  }, [user, mutate]);

  const refetch = async () => {
    await mutate();
  };

  return {
    pixels: data?.data.pixels || [],
    error,
    isLoading: typeof data === 'undefined',
    refetch,
  };
};
