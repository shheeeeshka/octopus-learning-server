import lessonService from "../services/lessonService.js";

class LessonController {
    async createLesson(req, res, next) {
        try {
            const { title, description, content } = req.body;
            const lesson = await lessonService.createLesson(title, description, content);
            return res.json(lesson);
        } catch (e) {
            next(e);
        }
    }

    async getLessons(req, res, next) {
        try {
            const lessons = await lessonService.getLessons();
            return res.json(lessons);
        } catch (e) {
            next(e);
        }
    }
}

export default new LessonController();