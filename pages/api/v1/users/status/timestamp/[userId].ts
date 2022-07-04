import type { NextApiRequest, NextApiResponse } from "next";
import { prismaUserStatusTimeStampFind } from "prisma/functions/commit";

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { query, method } = req;
  const _userId = query.userId as string;

  switch (method) {
    case "GET":
      const findRes = await prismaUserStatusTimeStampFind(_userId);
      if (findRes) {
        res.status(200).json(findRes);
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default Handler;
