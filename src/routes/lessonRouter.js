import { Router } from "express";

import lessonController from "../controllers/lessonController.js";

const router = new Router();

router.post("/create-lesson", lessonController.createLesson);
router.get("/all-modules", lessonController.getLessons);
router.delete("/delete-lesson/:lessonId", lessonController.deleteLesson);

export default router;