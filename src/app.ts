import express from "express";
import dotenv from "dotenv";
import { taskRouter } from "./routes/taskRoutes";
import { categoryRouter } from "./routes/categoryRoutes";
import { commentRouter } from "./routes/taskCommentRoutes";
import { archivedRouter } from "./routes/archivedTaskRoutes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use(taskRouter);
app.use(categoryRouter);
app.use(commentRouter);
app.use(archivedRouter);

app.listen(PORT, () => console.log(`Server's listening on port ${PORT}`));
