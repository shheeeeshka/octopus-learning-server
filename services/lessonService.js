import Lesson from "../models/lesson-model.js";
import fileService from "./fileService.js";

class LessonService {
    async createLesson(title = "", description = "", content = "", img) {
        const fileName = fileService.saveImg(img);
        const newLesson = await Lesson.create({ title, description, content, img: fileName }).catch(() => null);
        return newLesson;
    }

    async getLessons() {
        return [
            {
                "title": "Основы SQL",
                "description": "Изучение баз данных.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
            {
                "title": "Продвинутый SQL",
                "description": "Углубленное изучение запросов.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
            {
                "title": "Оптимизация запросов",
                "description": "Методы повышения производительности SQL.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
            {
                "title": "Работа с транзакциями",
                "description": "Управление транзакциями и их свойствами.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
            {
                "title": "Безопасность баз данных",
                "description": "Методы защиты данных и доступа.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
            {
                "title": "SQL для аналитиков",
                "description": "Анализ данных с помощью SQL-запросов.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
            {
                "title": "Интеграция SQL",
                "description": "Связывание SQL с другими языками.",
                "createdAt": "01.01.25",
                "previewImg": "https://static19.tgcnt.ru/posts/_0/6a/6af98dc08bc1cb1a88e340d1c32f979d.jpg",
            },
        ];
        const lessons = await Lesson.find().catch(() => null);
        return lessons;
    }
}

export default new LessonService();