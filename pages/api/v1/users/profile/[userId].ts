// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Profile } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from 'src/libs/backend/prisma/client';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Profile>
) => {
  const { query, method } = req;
  const uid = query.userId as string;

  switch (method) {
    case 'GET':
      const response = await prisma.profile.findUnique({
        where: {
          userId: uid,
        },
      });
      if (response) {
        res.status(200).json(response);
      }
      if (!response) {
        res.status(204).end();
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
