import express from "express";
import { v1Router } from "./v1/v1.js";
import cors from 'cors'

const app = express();
const port: number = process.env.PORT as unknown as number;

app.use(express.json())
app.use(cors())

app.use("/api/v1", v1Router);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port.toString()}`);
});