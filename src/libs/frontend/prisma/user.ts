import type { User } from 'src/types';

import { recordCommit } from 'src/libs/frontend/pixela';

import { axios } from '../axiosClient';
import { createHeader } from '../createHeader';

/* ユーザデータの取得（存在の確認） */
export const getUser = async (uid: string) => {
  try {
    const res = await axios.get<User>(`/api/v1/users/me`, {
      ...createHeader(uid),
    });

    return res.data;
  } catch (error) {
    return undefined;
  }
};

/* ユーザデータの新規作成（最初の一回のみを想定） */
export const createUser = async (
  user: Omit<
    User,
    | 'plan'
    | 'isFinishedRaidBattle'
    | 'isGettingLoginBonus'
    | 'isFinishedDailyQuest'
    | 'lastAttendedAt'
    | 'createdAt'
    | 'updatedAt'
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

/* 出席ボタン */
export const attend = async (user: User) => {
  await recordCommit(user.id);
  const response = await axios.patch<User, User>(
    '/api/v1/users/lastAttendedAt',
    {},
    {
      ...createHeader(user.id),
    }
  );

  return response;
};
