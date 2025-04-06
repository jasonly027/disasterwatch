import { Router } from "express";
import { z } from "zod";
import { addData, PinData, uploadImage } from "../database.js";
import multer, { Multer } from "multer";

export const addPinRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

function strToNum(val: string): number {
  const num = Number(val);
  if (isNaN(num)) {
    throw new Error("Not a number");
  }
  return num;
}

const schema = z.object({
  description: z.string(),
  latitude: z.string().transform(strToNum),
  longitude: z.string().transform(strToNum),
  danger_level: z.union([z.literal("minor"), z.literal("reconsider"), z.literal("avoid")]),
});

addPinRoute.post("/add_pin", upload.single("image"), async (req, res) => {
  const result = schema.safeParse(req.body);

  if (!result.success || req.file === undefined) {
    console.error("Validation errors:", result.error);
    res.status(400).send("Bad post body");
    return;
  }

  const file = toFile(req.file);
  const url = await uploadImage(file);
  if (url === null) {
    res.status(500).send("Failed to upload image to storage");
    return;
  }
  const pin = await newPinData(result.data, url);
  await addData(pin);

  res.json({ status: "ok" });
});

function toFile(raw: Express.Multer.File): File {
  const { originalname, mimetype, buffer } = raw;
  const blob = new Blob([buffer], { type: mimetype });
  const file = new File([blob], originalname, { type: mimetype });
  return file;
}

function newPinData(scheme: z.infer<typeof schema>, imgUrl: string): PinData {
  return {
    description: scheme.description,
    image: imgUrl,
    latitude: scheme.latitude,
    longitude: scheme.longitude,
    danger_level: scheme.danger_level,

    resolved: false,
    upvote: 0,
  };
}
