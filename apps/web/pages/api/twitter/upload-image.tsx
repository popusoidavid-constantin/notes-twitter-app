import formidable from "formidable";
import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { supabaseServer } from "../../../../../packages/app-main/utils/supabaseServer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = formidable({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: "Form parse error" });

    const userId = fields.userId?.[0];
    if (!userId) return res.status(400).json({ error: "Missing userId" });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return res.status(401).json({ error: "Unauthorized" });

    const file = files.file?.[0];
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const fileBuffer = fs.readFileSync(file.filepath);
    const fileName = `${Date.now()}-${file.originalFilename}`;
    const filePath = `posts/${user.id}/${fileName}`;

    const { error: uploadError } = await supabaseServer.storage.from("posts-images").upload(filePath, fileBuffer, {
      contentType: file.mimetype || "image/png",
      upsert: false,
    });

    if (uploadError) return res.status(500).json({ error: uploadError.message });

    const {
      data: { publicUrl },
    } = supabaseServer.storage.from("posts-images").getPublicUrl(filePath);

    return res.status(200).json({ url: publicUrl, path: filePath });
  });
}
