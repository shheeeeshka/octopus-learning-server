import { Router } from "express";

import userController from "../controllers/userController.js";
import userStatisticsController from "../controllers/userStatisticsController.js";

const router = new Router();

router.get("/get-users", userController.getUsers);
router.get("/find-user/:email", userController.findUser);
router.put("/update-user-statistics", userStatisticsController.updateStatistics);

export default router;