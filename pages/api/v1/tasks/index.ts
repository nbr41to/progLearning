import type { Prisma } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'src/libs/backend/prisma/client';

const tasksHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Prisma.BatchPayload>
) => {
  const { body, method } = req;

  switch (method) {
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
