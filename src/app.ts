import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { testRouter } from "./routes/testRouter";
import { taskRouter } from "./routes/taskRoutes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(testRouter);
app.use(taskRouter);

app.listen(PORT, () => console.log(`Server's listening on port ${PORT}`));
