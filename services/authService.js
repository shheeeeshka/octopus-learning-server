import * as uuid from "uuid";
import bcrypt from "bcrypt";

import ApiError from "../exceptions/ApiError.js";
import mailService from "./mailService.js";
import UserDto from "../dtos/userDto.js";
import tokenService from "./tokenService.js";
import User from "../models/user-model.js";
import UserStatistics from "../models/user-statistics-model.js";
import UserStatisticsDto from "../dtos/userStatisticsDto.js";
import achievementService from "./achievementService.js";
import UserRole from "../models/user-role-models.js";

class AuthService {
    async registration(email = "", password = "", name = "", surname = "") {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(`User ${email} already exists`);
        }

        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);

        let userRole = await UserRole.findOne({ role: "user" });
        if (!userRole) {
            userRole = await UserRole.create({ role: "user", permissions: ["add_friends"] });
        }

        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
            name,
            surname,
            roleId: userRole._id,
        });

        const userStatistics = await UserStatistics.create({ userId: user._id });
        const newUserAchievement = await achievementService.issueAchievement("", user._id);

        // await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`); add smtp data to send activation mail 

        const userDto = new UserDto({ ...user._doc, role: userRole.role });
        const userStatisticsDto = new UserStatisticsDto(userStatistics);
        console.log({ ...userDto, ...userStatisticsDto });

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
            userStatistics: userStatisticsDto,
            newUserAchievement,
        }
    }

    async login(email, password) {
        const user = await User.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`User ${email} not found`)
        }

        const isPassEq = await bcrypt.compare(password, user.password);
        if (!isPassEq) throw ApiError.BadRequest(`Incorrect password`)

        const userRole = await UserRole.findOne({ _id: user.roleId });
        if (!userRole) throw ApiError.BadRequest(`User role doesn't exist`);

        const userDto = new UserDto({ ...user._doc, role: userRole.role });
        const userStatistics = await UserStatistics.findOne({ userId: userDto._id });
        const userStatisticsDto = new UserStatisticsDto(userStatistics);
        const userAchievements = await achievementService.findUserAchievements(userDto._id);

        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
            userStatistics: userStatisticsDto,
            userAchievements,
        }
    }

    async logout(refreshToken) {
        if (!refreshToken) {
            throw ApiError.Unauthorized();
        }
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        const userData = tokenService.validateRefreshToken(refreshToken);
        const userTokenFromDB = await tokenService.findToken(refreshToken);

        if (!userData || !userTokenFromDB) {
            throw ApiError.Unauthorized();
        }

        const user = await User.findOne({ _id: userData._id });
        const userRole = await UserRole.findOne({ _id: user.roleId });
        const userDto = new UserDto({ ...user._doc, role: userRole.role });
        const userStatistics = await UserStatistics.findOne({ userId: user._id });
        const userStatisticsDto = new UserStatisticsDto(userStatistics);
        const userAchievements = await achievementService.findUserAchievements(user._id);
        const tokens = tokenService.generateTokens({ ...userDto });

        await tokenService.saveToken(userDto._id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto,
            userStatistics: userStatisticsDto,
            userAchievements,
        }
    }
}

export default new AuthService();