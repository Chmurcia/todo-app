import { Router } from "express";
import { loginUser, registerUser } from "../controllers/userController";
const router = Router();

router.route("/api/v1/user/register").post(registerUser);
router.route("/api/v1/user/login").post(loginUser);

export { router as userRouter };
