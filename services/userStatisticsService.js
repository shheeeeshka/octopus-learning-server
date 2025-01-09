import ApiError from "../exceptions/ApiError.js";
import UserStatistics from "../models/user-statistics-model.js";

class UserStatisticsService {
    async updateStatistics(bestTime = "", coveredTopicsCount = 0, correctAnswersCount = 0, totalAnswersCount = 0, userId = "", topicId = "") {
        if (!userId) throw ApiError.BadRequest("User ID not specified");
        const statistics = await UserStatistics.findOne({ userId }).catch(err => console.log(err));
        if (!statistics) throw ApiError.BadRequest("User statistics not found");

        const updateObject = {
            coveredTopics: statistics.coveredTopics
        };
        if (bestTime && typeof bestTime === "string") updateObject["bestTime"] = bestTime;
        if (coveredTopicsCount && topicId && !statistics.coveredTopics.includes(topicId) && typeof coveredTopicsCount === "number") {
            updateObject["coveredTopicsCount"] = statistics.coveredTopicsCount + coveredTopicsCount;
            updateObject.coveredTopics.push(topicId);
        }
        if (correctAnswersCount && typeof correctAnswersCount === "number") updateObject["correctAnswersCount"] = statistics.correctAnswersCount + correctAnswersCount;
        if (totalAnswersCount && typeof totalAnswersCount === "number") updateObject["totalAnswersCount"] = statistics.totalAnswersCount + totalAnswersCount;

        await UserStatistics.updateOne({ userId }, updateObject);

        const updatedStatistics = await UserStatistics.findOne({ userId });
        return updatedStatistics;
    }
}

export default new UserStatisticsService();