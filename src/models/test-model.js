import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
    timer: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "default",
    },
    moduleId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Test = mongoose.model("test", testSchema);

export default Test;