import type { User } from '@prisma/client';

import { prisma } from './client';

/* ユーザデータの作成（最初の一回のみを想定） */
export const prismaUserCreate = async (user: User) => {
  const response = await prisma.user.create({
    data: user,
  });

  return response;
};

/* ユーザデータの有無を確認 */
export const prismaUserFindUnique = async (uid: string) => {
  const response = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  return response;
};
