import { Router } from "express";
import { getTest } from "../controllers/testController";
const router = Router();

router.route("/test").get(getTest);

export { router as testRouter };
