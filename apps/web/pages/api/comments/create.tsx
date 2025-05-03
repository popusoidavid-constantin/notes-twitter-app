import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { postId, authorId, content } = req.body;

    if (!postId || !authorId || !content || content.trim() === "") {
      return res.status(400).json({ error: "Missing or invalid fields" });
    }

    const user = await prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });

    return res.status(200).json({ message: "Comment added successfully", comment });
  } catch (err) {
    console.error("Comment creation failed:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
