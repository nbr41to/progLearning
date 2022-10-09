import { showNotification } from '@mantine/notifications';
import axios from 'axios';

import { getLocalStorage } from './localStorage';

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Authorization = '';

/* Axios の Request 時の Interceptor */
axios.interceptors.request.use((config) => {
  if (!axios.defaults.headers.common.Authorization) {
    const token = getLocalStorage('token');
    if (!token) throw new axios.Cancel('Authorization is not set header.');
    // @ts-expect-error 意味わからん
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

/* Axios の Response 時の Interceptor */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    /* 401 Unauthorized */
    if (error.response?.status === 401) {
      if (typeof window === 'undefined') return;
      window.location.href = '/login';

      return;
    }

    /* 503を一時的に回避（Pixelaのエラー） */
    if (error.response?.status === 503) return;

    /* AxiosError */
    if (error.isAxiosError && error.response?.data?.errors) {
      const errorMessage = error.response.data.errors.messages.join('\n');
      showNotification({
        title: 'エラーが発生しました',
        message: errorMessage || '予期せぬエラーが発生しました',
        color: 'red',
      });

      return;
    }

    /* 例外 */
    showNotification({
      title: 'エラーが発生しました',
      message:
        typeof error?.message === 'string'
          ? error.message
          : '予期せぬエラーが発生しました',
      color: 'red',
    });
  }
);

export { axios };
