import type { User } from 'firebase/auth';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { axios } from 'src/libs/frontend/axiosClient';
import { auth } from 'src/libs/frontend/firebase/config';
import { getJwtToken } from 'src/libs/frontend/getJwtToken';
import {
  getLocalStorage,
  setLocalStorage,
} from 'src/libs/frontend/localStorage';

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
      const token = getLocalStorage('token');
      if (!token) {
        const jewToken = await getJwtToken(data.uid);
        axios.defaults.headers.common.Authorization = `Bearer ${jewToken}`;
        setLocalStorage('uid', data.uid);
        setLocalStorage('token', jewToken);
      }
    })();
  }, [data, mutate]);

  return data;
};
