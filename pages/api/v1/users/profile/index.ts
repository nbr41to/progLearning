// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { Profile } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { prismaProfileUpsert } from 'prisma/functions/users';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Profile>
) => {
  const { body, method } = req;

  switch (method) {
    case 'POST':
      const createRes = await prismaProfileUpsert(body);
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
