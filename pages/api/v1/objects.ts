import type { NextApiRequest, NextApiResponse } from 'next';
import type { BattleObject } from 'src/types';

import { prisma } from 'src/libs/backend/prisma/client';

const bossId = 'cl87bju930023u8zvlbqbcn4t'; // 1st Season

/* Boss Battle に関するAPI */
const battleObjectHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<BattleObject | BattleObject[]>
) => {
  const { method, body } = req;

  switch (method) {
    case 'GET':
      const getRes = await prisma.battleObject.findUnique({
        where: {
          id: bossId,
        },
      });
      if (getRes) {
        res.status(200).json(getRes);
      }
      break;
    case 'PATCH':
      const { hp } = body;
      const patchRes = await prisma.battleObject.update({
        where: {
          id: bossId,
        },
        data: {
          currentLife: hp,
        },
      });

      if (patchRes) {
        res.status(200).json(patchRes);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default battleObjectHandler;
