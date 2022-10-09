import { axios } from './axiosClient';

/* JWTを発行してTokenを取得 */
export const getJwtToken = async () => {
  const res = await axios.post('/api/v1/auth/', {
    method: 'POST',
    body: {
      uid: 'string',
    },
  });
  const token = await res.data;

  return token;
};
