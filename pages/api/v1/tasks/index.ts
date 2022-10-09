import type { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Task } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';
import { verifyToken } from 'src/libs/backend/verifyToken';

const tasksHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Prisma.BatchPayload | Task[]>
) => {
  const { body, method } = req;
  let uid: string;

  try {
    uid = await verifyToken(req);
  } catch (e) {
    res.status(401).end('Unauthorized');

    return;
  }

  switch (method) {
    /* 新しいTaskを複数作成 */
    case 'GET':
      const getRes = await prisma.task.findMany({
        where: {
          userId: uid,
        },
      });
      if (getRes) {
        res.status(200).json(getRes);
      }
      if (!getRes) {
        res.status(204).end(); // No Content
      }
      break;
    /* 新しいTaskを複数作成 */
    case 'POST':
      const createRes = await prisma.task.createMany({
        data: body,
      });
      if (createRes) {
        res.status(200).json(createRes); // 作成したデータの数を返す {count: n}
      }
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default tasksHandler;
