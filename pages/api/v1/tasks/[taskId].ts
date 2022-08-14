import type { NextApiRequest, NextApiResponse } from 'next';
import type { Task } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';

const taskHandler = async (req: NextApiRequest, res: NextApiResponse<Task>) => {
  const { query, method, body } = req;
  const taskId = query.taskId as string;

  switch (method) {
    case 'PUT':
      const putRes = await prisma.task.update({
        where: {
          id: taskId,
        },
        data: body,
      });
      if (putRes) {
        res.status(200).json(putRes);
      }
      if (!putRes) {
        res.status(204).end(); // No Content
      }
      break;
    case 'DELETE':
      const deleteRes = await prisma.task.delete({
        where: {
          id: taskId,
        },
      });
      if (deleteRes) {
        res.status(200).json(deleteRes);
      }
      if (!deleteRes) {
        res.status(204).end(); // No Content
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default taskHandler;
