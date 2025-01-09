import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    answers: [{
        value: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            default: false,
        },
        hint: {
            type: String,
            default: "",
        },
    }],
    withTimer: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: "default",
    },
    moduleId: {
        type: String,
    },
}, { timestamps: true });

const Test = mongoose.model("test", testSchema);

export default Test;