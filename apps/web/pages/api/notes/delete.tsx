import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { noteId } = req.body;

  if (!noteId) {
    return res.status(404).json({ error: "Note not found" });
  }

  try {
    await prisma.note.delete({
      where: { id: noteId },
    });
  } catch (err) {
    return res.status(500).json({ error: "Failed to delete the note" });
  }

  res.status(201).json({ message: "Note deleted successfully!" });
}
