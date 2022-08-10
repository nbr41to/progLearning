import type { User } from '@prisma/client';

import axios from 'axios';

/* ユーザデータの作成（最初の一回のみを想定） */
export const createUser = async (user: User) => {
  const response = await axios.post<User, User>('/api/user/', {
    data: user,
  });

  return response;
};
