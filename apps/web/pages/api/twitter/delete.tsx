import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { postId } = req.body;

  if (!postId) {
    return res.status(400).json({ error: "Post ID is required" });
  }

  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    return res.status(200).json({ message: "Post deleted successfully!" });
  } catch (err) {
    console.error("Error deleting post:", err);
    return res.status(500).json({ error: "Failed to delete the post" });
  }
}
