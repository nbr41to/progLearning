import { showNotification } from '@mantine/notifications';
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

/* Axios の Response 時の Interceptor */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    /* 401 Unauthorized */
    // TODO: 401 Unauthorized の場合は、ログイン画面に遷移する
    // if (error.response?.status === 401) {
    //   if (typeof window === 'undefined') return;
    //   window.location.href = '/login';

    //   return;
    // }

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
