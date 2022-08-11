import type { Task } from '@prisma/client';

import { prisma } from './client';

/* 新しいTaskを作成 */
export const prismaTaskCreate = async (
  task: Omit<Task, 'id' | 'done' | 'createdAt' | 'updatedAt'>
) => {
  const response = await prisma.task.create({
    data: task,
  });

  return response;
};

/* ログインユーザのTask一覧を取得 */
export const prismaStickyFindManyWhereUserId = async (uid: string) => {
  const response = await prisma.task.findMany({
    where: {
      userId: uid,
    },
  });

  return response;
};
