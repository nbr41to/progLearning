import type { NextApiRequest, NextApiResponse } from 'next';
import type { Task } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';

const taskDoneHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Task>
) => {
  const { query, method } = req;
  const taskId = query.taskId as string;

  switch (method) {
    case 'PATCH':
      const response = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          done: true,
        },
      });
      if (response) {
        res.status(200).json(response);
      }
      if (!response) {
        res.status(204).end(); // No Content
      }
      break;
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default taskDoneHandler;
