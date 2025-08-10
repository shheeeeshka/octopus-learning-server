import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    img: {
        type: String,
    },
    description: {
        type: String,
    },
    userId: {
        type: String,
    },
}, { timestamps: true });

const UserAchievement = mongoose.model("user_achievement", achievementSchema);

export default UserAchievement;