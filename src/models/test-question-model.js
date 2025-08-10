import mongoose from "mongoose";

const testQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    hint: {
        type: String,
        default: "",
    },
    testId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const TestQuestion = mongoose.model("test_question", testQuestionSchema);

export default TestQuestion;