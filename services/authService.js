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

class AuthService {
    async registration(email = "", password = "", name = "", surname = "") {
        const candidate = await User.findOne({ email });

        if (candidate) {
            throw ApiError.BadRequest(`User ${email} already exists`);
        }

        const activationLink = uuid.v4();
        const hashPassword = await bcrypt.hash(password, 5);

        const user = await User.create({
            email,
            password: hashPassword,
            activationLink,
            name,
            surname,
        });
        const userStatistics = await UserStatistics.create({ userId: user._id });
        const newUserAchievement = await achievementService.issueAchievement("", user._id);

        // await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activation/${activationLink}`); add smtp data to send activation mail

        const userDto = new UserDto(user);
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
        if (!isPassEq) {
            throw ApiError.BadRequest(`Incorrect password`)
        }

        const userDto = new UserDto(user);
        const userStatistics = await UserStatistics.findOne({ userId: user._id });
        const userStatisticsDto = new UserStatisticsDto(userStatistics);
        const userAchievements = await achievementService.findUserAchievements({ userId: user._id });
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
        const userDto = new UserDto(user);
        const userStatistics = await UserStatistics.findOne({ userId: user._id });
        const userStatisticsDto = new UserStatisticsDto(userStatistics);
        const userAchievements = await achievementService.findUserAchievements({ userId: user._id });
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