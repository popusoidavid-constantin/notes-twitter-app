import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ error: "Title, content, and userId are required" });
    }

    try {
      const note = await prisma.note.create({
        data: {
          title,
          content,
          authorId: userId,
        },
      });

      return res.status(201).json({ message: "Note created successfully", note });
    } catch (error) {
      console.error("Error creating note:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
