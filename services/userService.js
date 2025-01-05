import Achievement from "../models/achievement-model.js";
import User from "../models/user-model.js";

class UserService {
    async getUsers() {
        const users = await User.find();
        return users;
    }

    async findUser(email = "") {
        const user = await User.findOne({ email });
        const achievements = await Achievement.find({ userId: user._id });
        return { user, achievements };
    }
}

export default new UserService();