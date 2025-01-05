import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
    },
    img: {
        type: String,
    },
}, { timestamps: true });

const Lesson = mongoose.model("lesson", lessonSchema);

export default Lesson;