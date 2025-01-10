import mongoose from "mongoose";

const testAnswerSchema = new mongoose.Schema({
    answer: {
        type: String,
    },
    isCorrect: {
        type: Boolean,
    },
    questionId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const TestAnswer = mongoose.model("test_answer", testAnswerSchema);

export default TestAnswer;