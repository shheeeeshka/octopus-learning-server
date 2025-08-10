import mongoose from "mongoose";

const lessonProgressSchema = new mongoose.Schema({
    progress: {
        type: Number,
        default: 0,
    },
    lessonId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const LessonProgress = mongoose.model("lesson_progress", lessonProgressSchema);

export default LessonProgress;