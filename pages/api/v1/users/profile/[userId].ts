// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Profile } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getProfile, prismaProfileUpsert } from "prisma/functions/users";

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Profile>
) => {
  const {
    query: { userId },
    body,
    method,
  } = req;
  const _userId = typeof userId === "string" ? userId : userId[0];

  switch (method) {
    case "GET":
      const response = await getProfile(_userId);
      if (response) {
        res.status(200).json(response);
      }
      if (!response) {
        res.status(204).end();
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
