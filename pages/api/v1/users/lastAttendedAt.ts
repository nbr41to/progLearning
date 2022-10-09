import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'src/libs/backend/prisma/client';
import { verifyToken } from 'src/libs/backend/verifyToken';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const { method } = req;
  let uid: string;

  try {
    uid = await verifyToken(req);
  } catch (e) {
    res.status(401).end('Unauthorized');

    return;
  }

  switch (method) {
    case 'PATCH':
      const patchRes = await prisma.user.update({
        where: {
          id: uid,
        },
        data: {
          lastAttendedAt: new Date(),
        },
      });
      if (patchRes) {
        res.status(200).json(patchRes);
      } else {
        res.status(204).end(); // No Content
      }
      break;
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
