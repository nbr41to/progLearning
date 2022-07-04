import axios from 'axios';

/* SWRで使用するAxiosのFetcher */
export const axiosGetFetcher = async (url: string) => {
  const response = await axios.get('/api/v1/' + url);
  if (!response.data) return null;
  return response.data;
};
