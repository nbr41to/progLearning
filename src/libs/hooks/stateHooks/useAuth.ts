import type { User } from 'firebase/auth';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { axios } from 'src/libs/frontend/axiosClient';
import { auth } from 'src/libs/frontend/firebase/config';
import { getJwtToken } from 'src/libs/frontend/getJwtToken';

import { useStaticSWR } from './useStaticSWR';

/* 認証の処理をするHook */
export const useAuth = () => {
  const router = useRouter();
  const { data, mutate } = useStaticSWR<User>('/authState');

  /* Firebaseから認証状態を取得 */
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
  }, [mutate, router]);

  /* JWTを発行し、Headerに追加 */
  useEffect(() => {
    if (!data) return;
    (async () => {
      if (!axios.defaults.headers.common.Authorization) {
        const jewToken = await getJwtToken();
        axios.defaults.headers.common.Authorization = `Bearer ${jewToken}`;
      }
    })();
  }, [data]);

  return data;
};
