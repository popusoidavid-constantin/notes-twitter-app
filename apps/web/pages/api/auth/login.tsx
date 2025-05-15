import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { isValidPassword } from "../../../utils/auth";
import { createJSONToken } from "../../../utils/auth";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const isValidPw = await isValidPassword(password, user.password);

      if (!isValidPw) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      const token = createJSONToken(email, user.id);

      return res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, username: user.username },
      });
    } catch (err) {
      console.error("Server error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
