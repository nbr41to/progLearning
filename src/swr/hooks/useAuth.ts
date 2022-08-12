import { useEffect } from 'react';
import useSWR from 'swr';

import { auth } from 'src/libs/frontend/firebase/config';

export const useAuth = () => {
  const { data, mutate } = useSWR('count', null, {});

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      mutate(user);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return data;
};
