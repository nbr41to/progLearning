import { Magic } from '@magic-sdk/admin';
import type { NextApiRequest, NextApiResponse } from 'next';

const mAdmin = new Magic(process.env.MAGIC_SECRET_KEY || '');

type Data =
  | {
      authenticated: boolean;
    }
  | {
      error: string;
    };

/* EmailがSlackのWorkspaceに存在しているか確認する */
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const didToken = req.headers.authorization?.split(' ')[1]; // Bearer <token>
  mAdmin.token.validate(didToken || '');

  res.status(200).json({ authenticated: true });
};

export default handler;
