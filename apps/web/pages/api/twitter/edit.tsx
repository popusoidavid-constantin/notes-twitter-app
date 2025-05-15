import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, content, authorId, imageUrl, postId } = req.body;
    if (!title || !content || !authorId) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const user = await prisma.user.findUnique({
      where: { id: authorId },
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

    const updatedPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    return res.status(200).json({ message: "Post updated successfully!", updatedPost });
  } catch (err) {
    console.error("Post creation failed:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
