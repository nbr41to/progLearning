import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'src/libs/backend/prisma/client';
import { verifyToken } from 'src/libs/backend/verifyToken';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
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
    case 'GET':
      const getRes = await prisma.user.findUnique({
        where: {
          id: uid,
        },
      });
      if (getRes) {
        res.status(200).json(getRes);
      } else {
        res.status(204).end(); // No Content
      }
      break;

    case 'POST':
      const createRes = await prisma.user.create({
        ...body,
        select: {
          profile: {
            userId: body.userId,
            items: '[]',
          },
        },
      });
      if (createRes) {
        res.status(200).json(createRes);
      }
      break;

    case 'PUT':
      const updateRes = await prisma.user.update({
        where: {
          id: uid,
        },
        data: {
          ...body,
        },
      });
      if (updateRes) {
        res.status(200).json(updateRes);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
