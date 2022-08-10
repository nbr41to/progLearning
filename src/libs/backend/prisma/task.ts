import type { Task } from '@prisma/client';

import { prisma } from './client';

export const prismaTaskCreate = async (task: Omit<Task, 'id'>) => {
  const response = await prisma.task.create({
    data: task,
  });

  return response;
};
