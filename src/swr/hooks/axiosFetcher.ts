import axios from 'axios';

import { createHeader } from 'src/libs/frontend/createHeader';

// const uid = auth.currentUser?.uid;

/* SWRで使用するAxiosのFetcher */
export const axiosGetFetcher = async (url: string, uid?: string) => {
  const response = await axios.get(`/api/v1/${url}`, {
    ...createHeader(uid || ''),
  });
  if (!response.data) return null;

  return response.data;
};
