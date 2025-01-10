import ApiError from "../exceptions/ApiError.js";
import UserStatistics from "../models/user-statistics-model.js";
import achievementService from "./achievementService.js";

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
        const userAchievements = await achievementService.findUserAchievements(userId);

        const achievementTitles = userAchievements?.map(achievement => achievement.title) || [];
        console.log(achievementTitles);

        let newUserAchievement = null;
        if (updatedStatistics.correctAnswersCount >= 5 && !achievementTitles.includes("5 верных ответов")) newUserAchievement = await achievementService.issueAchievement("5 correct answers", userId);
        if (updatedStatistics.correctAnswersCount >= 10 && !achievementTitles.includes("10 верных ответов")) newUserAchievement = await achievementService.issueAchievement("10 correct answers", userId);
        if (updatedStatistics.correctAnswersCount >= 100 && !achievementTitles.includes("100 верных ответов")) newUserAchievement = await achievementService.issueAchievement("100 correct answers", userId);
        if (updatedStatistics.coveredTopicsCount >= 1 && !achievementTitles.includes("Успешный старт")) newUserAchievement = await achievementService.issueAchievement("First covered module", userId);

        return {
            updatedStatistics,
            newUserAchievement,
        };
    }
}

export default new UserStatisticsService();