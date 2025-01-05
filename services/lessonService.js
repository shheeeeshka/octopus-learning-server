import Lesson from "../models/lesson-model.js";

class LessonService {
    async createLesson(title = "", description = "", content = "") {
        const newLesson = await Lesson.create({ title, description, content }).catch(() => null);
        return newLesson;
    }

    async getLessons() {
        const lessons = await Lesson.find().catch(() => null);
        return lessons;
    }
}

export default new LessonService();