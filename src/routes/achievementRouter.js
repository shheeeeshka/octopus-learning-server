import { Router } from "express";

import achievementController from "../controllers/achievementController.js";

const router = new Router();

router.post("/create-achievement", achievementController.addAchievement);

export default router;