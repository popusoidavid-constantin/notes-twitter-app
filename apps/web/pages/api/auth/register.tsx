import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password, username, role } = req.body;

    try {
      if (!email || !password || !username || !role) {
        return res.status(400).json({ error: "Email, password, username and the role are required" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          username,
          role,
        },
      });

      return res.status(201).json({ message: "User registered successfully", user: { id: newUser.id, email: newUser.email, username: newUser.username, role: newUser.role } });
    } catch (err) {
      console.error("Error during user registration:", err);
      return res.status(500).json({ error: "Internal Server Error", err });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
