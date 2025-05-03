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
    console.log(decoded);
    const teacherId = (decoded as { userId: string }).userId;

    if (!teacherId) {
      return res.status(400).json({ error: "Invalid token: userId not found" });
    }

    const teacher = await prisma.user.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      return res.status(404).json({ error: "User not found" });
    }

    const sharedNotes = await prisma.sharedNote.findMany({
      where: { teacherId: teacher.id },
      include: {
        note: true,
      },
    });
    if (sharedNotes.length === 0) {
      return res.status(404).json({ error: "You don't have any notes yet." });
    }

    const notes = sharedNotes.map((sharedNote) => sharedNote.note);

    if (notes.length === 0) {
      return res.status(404).json({ error: "You don't have any notes yet." });
    }

    return res.status(200).json({ notes });
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
