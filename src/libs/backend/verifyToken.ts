import type { NextApiRequest } from 'next';

import jwt from 'jsonwebtoken';

// import { prisma } from './prisma/client';

const serverSecret = 'secret';

type Payload = { uid: string };

export const verifyToken = async (req: NextApiRequest) => {
  const { headers } = req;
  const bearer = headers.authorization || '';
  const token = bearer?.split(' ')[1];
  if (bearer.split(' ')[0] !== 'Bearer' || !token)
    throw new Error('Invalid token');
  const decoded = jwt.verify(token, serverSecret);
  const { uid } = decoded as Payload;

  /* 一旦、上の処理が成功していればOK（Firebaseからログインしているユーザの確認などをしたい） */
  // const exitingUser = await prisma.user.findUnique({
  //   where: {
  //     id: uid,
  //   },
  // });

  return uid;
};
