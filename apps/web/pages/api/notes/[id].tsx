import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const note = await prisma.note.findUnique({
      where: { id: id as string },
      include: {
        author: {
          select: {
            username: true,
            id: true,
          },
        },
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(200).json({ note });
  } catch (err) {
    console.error("Error fetching note details:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
