import type { NextApiRequest, NextApiResponse } from 'next';

import jwt from 'jsonwebtoken';

const serverSecret = 'secret';

const authHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<string>
) => {
  const { body, method } = req;

  switch (method) {
    /* JWTの発行 */
    case 'POST':
      if (!body) {
        res.status(400).end('Bad Request');
      }
      const getRes = jwt.sign(body, serverSecret);

      if (getRes) {
        res.status(200).json(getRes);
      }

      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default authHandler;
