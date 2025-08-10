import lessonService from "../services/lessonService.js";

class LessonController {
  async createLesson(req, res, next) {
    try {
      if (!req.body.title || !req.body.content) {
        return res
          .status(400)
          .json({ message: "Title and content are required" });
      }

      const { title, description, content } = req.body;
      const img = req.files?.img;

      const lesson = await lessonService.createLesson(
        title,
        description,
        content,
        img
      );
      return res.json(lesson);
    } catch (e) {
      next(e);
    }
  }

  async getLessons(req, res, next) {
    try {
      const lessons = await lessonService.getLessons();
      console.log({ lessons });
      return res.json(lessons);
    } catch (e) {
      next(e);
    }
  }

  async deleteLesson(req, res, next) {
    try {
      const { lessonId } = req.params;
      const deletedLesson = await lessonService.deleteLesson(lessonId);
      return res.json(deletedLesson);
    } catch (e) {
      next(e);
    }
  }
}

export default new LessonController();
