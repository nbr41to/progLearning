// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getUser } from "prisma/functions/users";

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const {
    query: { userId },
    body,
    method,
  } = req;
  const _userId = typeof userId === "string" ? userId : userId[0];

  switch (method) {
    case "GET":
      const response = await getUser(_userId);
      if (response) {
        res.status(200).json(response);
      }
      if (!response) {
        res.status(204).end();
      }
      break;
    case "PUT":
      console.log("body", body);
      break;
    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
