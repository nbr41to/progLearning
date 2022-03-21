// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "prisma/functions/users";

const usersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<User>
) => {
  const { body, method } = req;

  switch (method) {
    case "POST":
      console.log("body", body);
      const createRes = await createUser(body);
      if (createRes) {
        res.status(200).json(createRes);
      }
      break;
    case "PUT":
      console.log("body", body);
      break;
    default:
      res.setHeader("Allow", ["POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default usersHandler;
