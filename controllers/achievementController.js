import achievementService from "../services/achievementService.js";

class AchievementController {
    async addAchievement(req, res, next) {
        try {
            const { title, img, userId } = req.body;
            const achievement = await achievementService.createAchievement(title, img, userId);
            return res.json(achievement);
        } catch (e) {
            next(e);
        }
    }

    // async findUserAchievements(req, res, next) {
    //     try {
    //         const { userId } = req.params;
    //         const achievements = await achievementService.findUserAchievements(userId);
    //         return res.json(achievements);
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export default new AchievementController();