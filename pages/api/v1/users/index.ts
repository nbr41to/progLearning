import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prismaUserCreate } from 'src/libs/backend/prisma/user';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      const createRes = await prismaUserCreate(body);
      if (createRes) {
        res.status(200).json(createRes);
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
