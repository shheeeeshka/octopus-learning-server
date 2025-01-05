import { Router } from "express";

import authRouter from "./authRouter.js";
import accountRouter from "./accountRouter.js";
import userRouter from "./userRouter.js";
import achievementRouter from "./achievementRouter.js";
import lessonRouter from "./lessonRouter.js";
import testRouter from "./testRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/account", accountRouter);
router.use("/users", userRouter);
router.use("/achievements", achievementRouter);
router.use("/lessons", lessonRouter);
router.use("/tests", testRouter);

export default router;