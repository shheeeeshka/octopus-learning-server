import userService from "../services/userService.js";

class UserController {
    async getUsers(req, res, next) {
        try {
            const users = await userService.getUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async findUser(req, res, next) {
        try {
            const { email } = req.params;
            const user = await userService.findUser(email);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    }
}

export default new UserController();