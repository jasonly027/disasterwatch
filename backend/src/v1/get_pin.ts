import { Router } from "express";
import { getData } from "../database.js";

export const getPinRoute = Router();

getPinRoute.get("/get_pin", async (req, res) => {
  const result = await getData();
  if (result.error) {
    console.error("Failed to get pins", result.error);
    res.status(500).send("Failed to get pins");
    return;
  }

  res.json(result.data);
});
