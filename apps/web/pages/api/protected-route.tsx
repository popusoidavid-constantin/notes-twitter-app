import { NextApiRequest, NextApiResponse } from "next";
import { verifyJSONToken } from "../../utils/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyJSONToken(token);
    return res.status(200).json({ message: "Protected data", user: decoded });
  } catch (err) {
    console.error("Invalid token:", err);
    return res.status(401).json({ error: "Invalid token" });
  }
}
