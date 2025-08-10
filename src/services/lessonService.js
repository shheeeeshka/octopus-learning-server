import Lesson from "../models/lesson-model.js";
import fileService from "./fileService.js";

class LessonService {
    async createLesson(title = "", description = "", content = "", img) {
        let fileName = "";
        if (img) fileName = await fileService.saveImg(img);
        const newLesson = await Lesson.create({ title, description, content, previewImg: fileName }).catch(() => null);
        return newLesson;
    }

    async getLessons() {
        const lessons = await Lesson.find().catch(() => []);
        return lessons;
    }

    async deleteLesson(lessonId = "") {
        const deletedLesson = await Lesson.findOneAndDelete({ _id: lessonId }).catch(() => null);
        return deletedLesson;
    }
}

export default new LessonService();