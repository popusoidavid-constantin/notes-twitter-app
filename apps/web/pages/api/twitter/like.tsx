import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { postId, userId } = req.body;
    if (!userId || !postId) {
      return res.status(400).json({ error: "Something went wrong" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid authorId. User does not exist." });
    }

    const existingPost = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!existingPost) {
      return res.status(404).json({ error: "Could not found the post" });
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      return res.status(400).json({ error: "User already liked this post" });
    }

    const like = await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    return res.status(200).json({ message: "Post updated successfully!", like });
  } catch (err) {
    console.error("Post creation failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
