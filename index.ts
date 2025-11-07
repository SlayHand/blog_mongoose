import express, { Express, Request, Response } from "express";
import stringsController from "./controllers/strings";
import cors = require("cors");
import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3006"],
    // credentials: true,
  })
);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error("MONGO_URI is not defined in .env");
}

mongoose.connect(mongoUri);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

// sinu enda controllerid
app.use("/", stringsController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
