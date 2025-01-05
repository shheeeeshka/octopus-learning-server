import { Router } from "express";

import lessonController from "../controllers/lessonController.js";

const router = new Router();

router.post("/create-lesson", lessonController.createLesson);
router.get("/get-lessons", lessonController.getLessons);

export default router;