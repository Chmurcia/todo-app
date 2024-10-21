import express from "express";
import dotenv from "dotenv";
// ROUTES
import { taskRouter } from "./routes/taskRoutes";
import { categoryRouter } from "./routes/categoryRoutes";
import { commentRouter } from "./routes/taskCommentRoutes";
import { archivedRouter } from "./routes/archivedTaskRoutes";
import { subtaskRouter } from "./routes/subtaskRoutes";
import { subtaskCommentRouter } from "./routes/subtaskCommentRoutes";
import { userRouter } from "./routes/userRoutes";

import { authenticateToken } from "./middlewares/authMiddleware";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// ROUTES
app.use(userRouter);

app.use(authenticateToken, taskRouter);
app.use(authenticateToken, categoryRouter);
app.use(authenticateToken, commentRouter);
app.use(authenticateToken, archivedRouter);
app.use(authenticateToken, subtaskRouter);
app.use(authenticateToken, subtaskCommentRouter);

app.listen(PORT, () => console.log(`Server's listening on port ${PORT}`));

export = app;
