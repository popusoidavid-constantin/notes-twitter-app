import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
          },
        },
      },
    });

    if (posts.length === 0) {
      return res.status(404).json({ error: "You don't have any posts yet." });
    }

    return res.status(200).json({ posts });
  } catch (err) {
    console.error("Error fetching posts:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
