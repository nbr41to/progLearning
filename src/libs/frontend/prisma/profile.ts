import type { Profile } from 'src/types';

import { axios } from '../axiosClient';
import { createHeader } from '../createHeader';

/* Profileの更新 */
export const updateProfile = async (profile: Profile) => {
  const response = await axios.put<Profile, Profile>(
    '/api/v1/users/profile',
    profile,
    {
      ...createHeader(profile.userId),
    }
  );

  return response;
};
