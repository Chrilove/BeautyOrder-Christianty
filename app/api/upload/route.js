import formidable from "formidable";
import { writeFile } from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const form = formidable({ multiples: false });

  const data = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      const file = files.file[0];
      const data = await readFile(file.filepath);
      await writeFile(`./public/uploads/${file.originalFilename}`, data);

      resolve({ fields, file });
    });
  });

  return Response.json({ message: "Upload sukses", data });
}
