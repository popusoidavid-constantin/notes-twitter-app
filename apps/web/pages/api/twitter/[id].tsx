import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: id as string },
      include: {
        author: {
          select: {
            id: true,
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json({ post });
  } catch (err) {
    console.error("Error fetching post details:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
