import { Router } from "express";
import { addPinRoute } from "./add_pin.js";
import { getPinRoute } from "./get_pin.js";
import { reportPinRoute } from "./report_pin.js";

export const v1Router = Router();

v1Router.use(addPinRoute);
v1Router.use(getPinRoute);
v1Router.use(reportPinRoute);
