import { Router } from "express";
export const addPinRoute = Router()
import { z } from 'zod';
import { addData } from "../database.js";

const schema = z.object({
    description: z.string(),
    image: z.string().url(),
    resolved: z.boolean(),
    upvote: z.number().int().max(2),
    longitude: z.number(),
    latitude: z.number(),
    danger_level: z.string(),
  });

export type pinSchema = z.infer<typeof schema>;

addPinRoute.post("/add_pin", (req, res) => {
  console.log(req.body)
    const result = schema.safeParse(req.body)

    if (result.success) {
        console.log("Valid data:", result.data);
        addData(result.data)
      } else {
        console.error("Validation errors:", result.error.errors);
      }

    res.json({status:'Ok'})
});