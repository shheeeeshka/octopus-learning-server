import Achievement from "../models/achievement-model.js";
import fileService from "./fileService.js";

class AchievementService {
    async createAchievement(title = "", img, userId = "") {
        const fileName = await fileService.saveImg(img);
        const achievement = await Achievement.create({ title, img: fileName, userId });
        return achievement;
    }

    async issueAchievement(type = "", userId) {
        const achievementData = {
            "": {
                title: "Ворота открыты",
                img: "achievement-1.png",
            },
            "5 correct answers": {
                title: "5 верных ответов",
                img: "achievement-2.png",
            },
            "10 correct answers": {
                title: "10 верных ответов",
                img: "achievement-3.png",
            },
            "First covered module": {
                title: "Успешный старт",
                img: "achievement-4.png",
            },
        };
        const achievement = await Achievement.create({ title: achievementData[type].title, img: achievementData[type].img, userId });
        return achievement;
    }

    async findUserAchievements(userId = "") {
        const achievements = await Achievement.find({ userId });
        return achievements;
    }
}

export default new AchievementService();