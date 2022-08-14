import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from 'swr';

import { auth } from 'src/libs/frontend/firebase/config';

export const useAuth = () => {
  const router = useRouter();
  const { data, mutate } = useSWR('count', null, {});

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      if (user) {
        mutate(user);
      } else {
        router.push('/usage');
      }
    });

    return () => {
      unsubscribed();
    };
  }, []);

  return data;
};
