import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const KEY = "supersecret";
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, KEY);
    const userId = (decoded as { userId: string }).userId;

    if (!userId) {
      return res.status(400).json({ error: "Invalid token: userId not found" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userNotes = await prisma.note.findMany({
      where: { authorId: user.id },
    });

    const userPosts = await prisma.post.findMany({
      where: { authorId: user.id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ user, userNotes, userPosts });
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
