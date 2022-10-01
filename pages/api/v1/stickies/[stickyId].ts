import type { NextApiRequest, NextApiResponse } from 'next';
import type { Sticky } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';

const stickyHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Sticky>
) => {
  const { query, method, body } = req;
  const stickyId = query.stickyId as string;

  switch (method) {
    case 'PUT':
      const putRes = await prisma.sticky.update({
        where: {
          id: stickyId,
        },
        data: body,
      });
      if (putRes) {
        res.status(200).json(putRes);
      }
      if (!putRes) {
        res.status(204).end(); // No Content
      }
      break;

    case 'DELETE':
      const deleteRes = await prisma.sticky.delete({
        where: {
          id: stickyId,
        },
      });
      if (deleteRes) {
        res.status(200).json(deleteRes);
      }
      if (!deleteRes) {
        res.status(204).end(); // No Content
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default stickyHandler;
