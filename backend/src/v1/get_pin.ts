import { Router } from "express";
export const getPinRoute = Router()
import { getData } from "../database.js";

getPinRoute.get("/get_pin", async (req, res) => {
    const result = await getData()
    console.log(result)
    res.json({status:'Ok'})
});