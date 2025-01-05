import Lesson from "../models/lesson-model.js";
import fileService from "./fileService.js";

class LessonService {
    async createLesson(title = "", description = "", content = "", img) {
        const fileName = fileService.saveImg(img);
        const newLesson = await Lesson.create({ title, description, content, img: fileName }).catch(() => null);
        return newLesson;
    }

    async getLessons() {
        const lessons = await Lesson.find().catch(() => null);
        return lessons;
    }
}

export default new LessonService();