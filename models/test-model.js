import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    questions: [{
        value: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            default: false,
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
    topicId: {
        type: String,
    },
}, { timestamps: true });

const Test = mongoose.model("test", testSchema);

export default Test;