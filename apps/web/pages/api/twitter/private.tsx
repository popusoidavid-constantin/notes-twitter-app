import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const KEY = process.env.JWT_SECRET || "supersecret";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Invalid token format" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, KEY);

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      return res.status(400).json({ error: "Invalid token payload" });
    }

    const userId = decoded.userId;

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const posts = await prisma.post.findMany({ where: { authorId: user.id } });

    if (!posts.length) {
      return res.status(404).json({ error: "You don't have any posts yet." });
    }

    return res.status(200).json({ posts });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
