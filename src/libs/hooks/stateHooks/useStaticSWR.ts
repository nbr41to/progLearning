import type { Key, SWRResponse } from 'swr';

import useSWR, { mutate, useSWRConfig } from 'swr';

/* ベースとなるSWRのHook */
export const useStaticSWR = <T>(key: Key, initialData?: T): SWRResponse<T> => {
  const { cache } = useSWRConfig();

  if (!cache.get(key) && initialData) {
    mutate(key, initialData);
  }

  return useSWR<T>(key, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
