import express from "express";

const app = express();
const port: number = process.env.PORT as unknown as number;

app.get("/api/hello", (req, res) => {
    res.json({hello: "World"})
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port.toString()}`);
});
