import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'src/libs/backend/prisma/client';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const { method, headers } = req;
  const bearer = headers.authorization;
  const uid = bearer?.split(' ')[1];

  if (!uid) {
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
