import Achievement from "../models/achievement-model.js";

class AchievementService {
    async createAchievement(title = "", img = "", userId = "") {
        const achievement = await Achievement.create({ title, img, userId });
        return achievement;
    }
}

export default new AchievementService();