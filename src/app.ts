import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { taskRouter } from "./routes/taskRoutes";
import { categoryRouter } from "./routes/categoryRoutes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(categoryRouter);
app.use(taskRouter);

app.listen(PORT, () => console.log(`Server's listening on port ${PORT}`));
