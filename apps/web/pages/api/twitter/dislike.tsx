import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { postId, userId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ error: "Missing postId or userId" });
    }

    const like = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (!like) {
      return res.status(404).json({ error: "Like not found" });
    }

    await prisma.like.delete({
      where: {
        id: like.id,
      },
    });

    return res.status(200).json({ message: "Like removed successfully" });
  } catch (err) {
    console.error("Error removing like:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
