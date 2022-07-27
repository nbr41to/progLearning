// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserWithProfile } from 'prisma/functions/users';

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const { query, method } = req;
  const _userId = query.userId as string;

  switch (method) {
    case 'GET':
      const response = await getUserWithProfile(_userId);
      if (response) {
        res.status(200).json(response);
      }
      if (!response) {
        res.status(204).end();
      }
      break;
    case 'PUT':
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
