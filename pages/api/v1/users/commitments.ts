import type { NextApiRequest, NextApiResponse } from 'next';
import type { Sticky, Task } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<(Sticky | Task)[]>
) => {
  const { body, method } = req;

  switch (method) {
    case 'GET':
      /* Stickyを取得 */
      const stickies = await prisma.sticky.findMany({
        where: {
          userId: body.userId,
        },
      });
      /* 完了しているTaskを取得 */
      const doneTasks = await prisma.task.findMany({
        where: {
          userId: body.userId,
          done: true,
        },
      });
      if (stickies || doneTasks) {
        res.status(200).json([...stickies, ...doneTasks]);
      }
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
