import type { NextApiRequest, NextApiResponse } from 'next';
import type { Task } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';

const taskHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Task[]>
) => {
  const { query, method } = req;
  const uid = query.userId as string;

  switch (method) {
    case 'GET':
      const response = await prisma.task.findMany({
        where: {
          userId: uid,
        },
      });
      if (response) {
        res.status(200).json(response);
      }
      if (!response) {
        res.status(204).end(); // No Content
      }
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default taskHandler;
