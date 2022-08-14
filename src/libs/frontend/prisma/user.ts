import type { User } from 'src/types';

import axios from 'axios';

import { createHeader } from '../createHeader';

/* ユーザデータの新規作成（最初の一回のみを想定） */
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
  const response = await axios.post<User, User>('/api/v1/users/me', user, {
    ...createHeader(user.id),
  });

  return response;
};

/* ユーザ情報の更新 */
export const updateUser = async (user: User) => {
  const response = await axios.put<User, User>('/api/v1/users/me', user, {
    ...createHeader(user.id),
  });

  return response;
};
