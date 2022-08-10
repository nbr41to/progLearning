import type { Sticky } from '@prisma/client';

import { prisma } from './client';

export const prismaStickyCreate = async (sticky: Omit<Sticky, 'id'>) => {
  const response = await prisma.sticky.create({
    data: sticky,
  });

  return response;
};
