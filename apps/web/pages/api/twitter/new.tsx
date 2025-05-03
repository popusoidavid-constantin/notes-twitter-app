import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, content, authorId, imageUrl } = req.body;
    if (!title || !content || !authorId || !imageUrl) {
      return res.status(400).json({ error: "All fields including image are required." });
    }

    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid authorId. User does not exist." });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        imageUrl,
      },
    });

    return res.status(200).json(post);
  } catch (err) {
    console.error("Post creation failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
