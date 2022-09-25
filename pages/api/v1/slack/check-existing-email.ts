import type { NextApiRequest, NextApiResponse } from 'next';

import { checkExistingEmail } from 'slack';

type Data = {
  exist: boolean;
};

/* EmailがSlackのWorkspaceに存在しているか確認する */
const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.body;
  const result = await checkExistingEmail(email);

  res.status(200).json({ exist: result });
};

export default handler;
