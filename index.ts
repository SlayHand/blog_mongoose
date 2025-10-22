import express, { Express, Request, Response } from "express";
import stringsController from "./controllers/strings";
import cors = require("cors");

const app: Express = express();

// Pane CORS MIDDLEWARE ENNE route'e
app.use(
  cors({
    origin: ["http://localhost:3006"],
    // kui vajad küpsiseid/Authorizationi:
    // credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/", stringsController);

app.listen(3000, () => {
  console.log(`[server]: Server is running at http://localhost:3000`);
});
