import mongoose from "mongoose";

const userStatisticsSchema = new mongoose.Schema({
    bestTime: {
        type: String,
        default: "0.0 мин"
    },
    coveredTopicsCount: {
        type: Number,
        default: 0,
    },
    correctAnswersCount: {
        type: Number,
        default: 0,
    },
    totalAnswersCount: {
        type: Number,
        default: 0,
    },
    coveredTopics: {
        type: [String],
        default: [],
    },
    userId: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const UserStatistics = mongoose.model("user_statistics", userStatisticsSchema);

export default UserStatistics;