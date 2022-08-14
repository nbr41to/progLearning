import type { User } from 'src/types';

import axios from 'axios';

/* ユーザデータの作成（最初の一回のみを想定） */
export const createUser = async (
  user: Omit<
    User,
    | 'plan'
    | 'isFinishedRaidBattle'
    | 'isGettingLoginBonus'
    | 'isFinishedDailyQuest'
    | 'createdAt'
  >
) => {
  const response = await axios.post<User, User>('/api/v1/users/', user);

  return response;
};

/* IDからユーザデータを取得 */
export const getUser = async (uid: string) => {
  const response = await axios.get<User>(`/api/v1/users/${uid}`);

  return response.data;
};
