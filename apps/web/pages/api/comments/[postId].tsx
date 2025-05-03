import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const postIdParam = req.query.postId;
  const postId = Array.isArray(postIdParam) ? postIdParam[0] : postIdParam;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!postId) {
    return res.status(400).json({ error: "Invalid postId" });
  }

  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({ comments });
  } catch (err) {
    console.error("Fetching comments failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
