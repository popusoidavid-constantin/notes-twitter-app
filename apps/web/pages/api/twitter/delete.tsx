import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { postId } = req.body;

  if (!postId) {
    return res.status(404).json({ error: "Post not found" });
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete the post" });
  }

  res.status(201).json({ message: "Post deleted successfully!" });
}
