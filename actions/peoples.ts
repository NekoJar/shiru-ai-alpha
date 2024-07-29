import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { totalsUp, totalsDown, totals } = req.body;

    try {
      const newRecord = await prisma.peoples.create({
        data: {
          totalsUp,
          totalsDown,
          totals,
        },
      });
      res.status(201).json(newRecord);
    } catch (error) {
      res.status(500).json({ error: "Error creating record" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
