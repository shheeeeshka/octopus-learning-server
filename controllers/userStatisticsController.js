import userStatisticsService from "../services/userStatisticsService.js";

class UserStatisticsController {
    async updateStatistics(req, res, next) {
        try {
            const { bestTime, coveredTopicsCount, correctAnswersCount, totalAnswersCount, userId, topicId } = req.body;
            const updatedStatistics = await userStatisticsService.updateStatistics(bestTime, coveredTopicsCount, correctAnswersCount, totalAnswersCount, userId, topicId);
            console.log(updatedStatistics);
            return res.json(updatedStatistics);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserStatisticsController();