import type { Sticky } from '@prisma/client';

import { prisma } from './client';

/* 新しいStickyを作成 */
export const prismaStickyCreate = async (sticky: Omit<Sticky, 'id'>) => {
  const response = await prisma.sticky.create({
    data: sticky,
  });

  return response;
};

/* Sticky一覧を取得 */
export const prismaStickyFindMany = async () => {
  const response = await prisma.sticky.findMany({
    include: {
      user: {
        select: {
          displayName: true,
        },
      },
    },
  });

  return response;
};
