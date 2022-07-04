import axios from 'axios';
import { Profile } from 'types/users';

export const upsertProfile = async (params: Profile) => {
  const response = await axios.post(
    `/api/v1/users/profile/${params.userId}`,
    params,
  );
  if (!response.data) return null;
  return response.data;
};
