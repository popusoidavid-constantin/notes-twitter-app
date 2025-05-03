import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const teachers = await prisma.user.findMany({
      where: { role: "TEACHER" },
    });

    if (!teachers) {
      return res.status(400).json({ error: "No teachers found" });
    }

    return res.status(200).json({ teachers });
  } catch (err) {
    console.error("Error fetching user data:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
