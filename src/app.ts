import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { testRouter } from "./routes/testRouter";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(testRouter);

app.listen(PORT, () => console.log(`Server's listening on port ${PORT}`));
