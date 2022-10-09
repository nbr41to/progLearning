import { axios } from 'src/libs/frontend/axiosClient';

/* SWRで使用するAxiosのFetcher（認証あり） */
export const axiosGetFetcher = async (url: string) => {
  const response = await axios.get(`/api/v1/${url}`);
  if (!response.data) return null;

  return response.data;
};
