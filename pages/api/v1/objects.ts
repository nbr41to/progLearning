import type { NextApiRequest, NextApiResponse } from 'next';

import { getObjects } from 'src/libs/backend/notion/getObjects';

const usersHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      const getRes = await getObjects();

      if (getRes) {
        res.status(200).json(getRes);
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
