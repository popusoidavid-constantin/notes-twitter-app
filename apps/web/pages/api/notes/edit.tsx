import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { title, content, noteId, isPublic, teacherId } = req.body;

    if (!title || !content || !noteId || isPublic === undefined) {
      return res.status(400).json({ message: "Title, content, and userId are required" });
    }

    try {
      const existingNote = await prisma.note.findUnique({
        where: { id: noteId },
      });

      if (!existingNote) {
        return res.status(404).json({ message: "Note not found" });
      }

      const updatedNote = await prisma.note.update({
        where: {
          id: noteId,
        },
        data: {
          title,
          content,
          isPublic,
        },
      });

      if (teacherId) {
        const teacher = await prisma.user.findUnique({
          where: { id: teacherId },
        });

        if (!teacher || teacher.role !== "TEACHER") {
          return res.status(404).json({ message: "Teacher not found or invalid role" });
        }

        const existingSharedNote = await prisma.sharedNote.findFirst({
          where: {
            teacherId: teacher.id,
            noteId: noteId,
          },
        });

        if (existingSharedNote) {
          return res.status(400).json({ error: "This note is already shared with this teacher." });
        }

        await prisma.sharedNote.create({
          data: {
            noteId,
            teacherId,
          },
        });
      }

      return res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
      console.error("Error updating note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
