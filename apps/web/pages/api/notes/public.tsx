import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const notes = await prisma.note.findMany({
      where: {
        isPublic: true,
      },
      include: {
        author: {
          select: {
            username: true,
          },
        },
      },
    });

    if (notes.length === 0) {
      return res.status(404).json({ error: "You don't have any notes yet." });
    }

    return res.status(200).json({ notes });
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
