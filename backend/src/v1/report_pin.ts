import { Router } from "express";
import { z } from "zod";
import { reportPin } from "../database.js";

export const reportPinRoute = Router();

const schema = z.object({
  id: z.number().int(),
  upvote: z.number().int(),
});

reportPinRoute.post("/report_pin", async (req, res) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    console.error("Validation errors:", result.error);
    res.status(400).send("Bad post body");
    return;
  }

  const { id, upvote } = result.data;

  await reportPin(id, upvote);

  res.json({ status: "ok" });
});
