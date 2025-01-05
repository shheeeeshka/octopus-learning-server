import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    img: {
        type: String,
    },
    userId: {
        type: String,
    },
}, { timestamps: true });

const Achievement = mongoose.model("achievement", achievementSchema);

export default Achievement;