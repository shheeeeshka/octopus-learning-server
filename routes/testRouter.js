import { Router } from "express";

import testController from "../controllers/testController.js";

const router = new Router();

router.post("/create-test", testController.createTest);
router.get("/find-test/:topicId", testController.getTest);
router.get("/get-tests", testController.getAllTests);

export default router;