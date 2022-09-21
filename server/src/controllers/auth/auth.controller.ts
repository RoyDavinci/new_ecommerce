import { NextFunction, Request, Response } from "express";
import { logger } from "../../common/logger";
import { sendEmail } from "../../common/sendMail";
import _ from "lodash";
import moment, { MomentInput } from "moment";
import { PrismaClient, Prisma } from "@prisma/client";
import { makeid } from "../../common/generateString";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { IUser } from "./auth.interface";
import { generateHash } from "../../common/generateHash";
import { generateToken } from "../../common/generateToken";
import config from "../../config";
import { RedisClient } from "../../db/class";
import { generateOTP } from "../../common/generateOtp";
import { adminNewPasswordHTML } from "../../common/adminNewPasswordHtml";
import { admiNewPasswordLink } from "../../common/adminNewPasswordLink";
import { adminNewPasswordConfirmationHTML } from "../../common/adminNewPAsswordConfirmationHTML";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password, username, phone, address } = req.body;

    try {
        const checkEmail = await prisma.users.findUnique({ where: { email } });

        if (checkEmail) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user already exist" });

        const { otp, ttl, createdAt } = await generateOTP();

        const prospectId = await redisInstance.createProspectiveUser({ first_name, last_name, otp, ttl, createdAt, email, password, username, phone, address });

        return res.status(200).json({ success: true, message: "kindly enter the OTP sent to your email", data: { ttl, createdAt, otp }, prospectId });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new user cannot be created with this email" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e });
        }
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e, message: "an error occured on creating a user" });
    }
};

export const confirmOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { otp, prospectId } = req.body;

    try {
        const cachedUserInfo = await redisInstance.fetchProspectiveUser(prospectId);
        if (_.isEmpty(cachedUserInfo)) return next({ statusCode: 400, message: "invalid OTP" });
        const cachedCreatedAt = cachedUserInfo.createdAt as unknown as MomentInput;
        const cachedOTP = cachedUserInfo.otp as unknown as number;
        const otpTimeDifference = moment(moment.utc().format()).diff(moment(cachedCreatedAt)) / 1000;
        if (otp !== cachedOTP) return next({ statusCode: 409, message: "invalid OTP" });
        if (otpTimeDifference > config.server.OTP_TTL) return next({ statusCode: 409, message: "OTP has expired" });

        const hashedPasssword = await generateHash(cachedUserInfo.password);

        const voucher = makeid(10);

        const newSubscriber = await prisma.subscribers.create({ data: { username: cachedUserInfo.username, phone: cachedUserInfo.phone, email: cachedUserInfo.email, voucher, role: "subscriber" } });
        const newUser = await prisma.users.create({
            data: { first_name: cachedUserInfo.first_name, last_name: cachedUserInfo.last_name, password: hashedPasssword, email: cachedUserInfo.email, subscriberId: newSubscriber.id, role: newSubscriber.role },
        });

        const token = generateToken({ id: newUser.id, email: newUser.email, role: newUser.role });

        return res.status(200).json({ success: true, data: { user: newSubscriber }, token, validity: config.server.tokenExpirationTime });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error, message: "an error occured on creating a user" });
    }
};

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.users.findMany();
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ user: { users } });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const findUser = await prisma.users.findUnique({ where: { id: Number(id) } });
        if (!findUser) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User does not exist" });
        }
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: { findUser } });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { adminId } = req.user as unknown as IUser;
    const { userId } = req.params;
    try {
        const findAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!findAdmin) return res.status(400).json({ message: "admin not found" });

        const findUser = await prisma.users.findUnique({ where: { id: Number(userId) } });
        if (!findUser) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User does not exist" });
        }
        await prisma.users.delete({ where: { id: Number(userId) } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "User deleted" });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { id, adminId, subscriberId } = req.user as unknown as IUser;
    try {
        let additionInfo;
        let email;
        let role;

        if (adminId) {
            additionInfo = await prisma.admin.findUnique({ where: { id: adminId } });
            email = additionInfo?.email;
            role = additionInfo?.role;
        }
        if (subscriberId) {
            additionInfo = await prisma.subscribers.findUnique({ where: { id: subscriberId } });
            email = additionInfo?.email;
            role = additionInfo?.role;
        }
        return res.status(200).json({ success: true, token: generateToken({ id, email, adminId, subscriberId, role: role }), validity: config.server.tokenExpirationTime, data: { user: additionInfo } });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = {
            token: req.headers.authorization?.split(" ")[1],
            reason: "logout",
            createdAt: moment.utc().format(),
        };
        redisInstance.blacklistUser(data);
        if (req.session) {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            req.session.destroy(() => {});
            res.clearCookie("connect.sid");
        }
        req.logOut((err) => {
            if (err) return res.status(400).json({ message: "an error occured on signout" });
            return res.status(200).json({ success: true, message: "signed out successfully" });
        });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        const checkUser = await prisma.users.findUnique({ where: { email } });
        if (!checkUser) return res.status(400).json({ message: `user with ${email} does not exist` });
        const { adminId, subscriberId } = checkUser;

        const { otp, ttl, createdAt } = await generateOTP();

        if (adminId) {
            const prospectId = await redisInstance.createForgetPasswordRequest({ userId: adminId, otp, ttl, createdAt, profileId: email });
            const token = generateToken({ id: adminId, email: checkUser.email });
            await sendEmail(checkUser.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordHTML(admiNewPasswordLink(token, config.server.FORGET_PASSWORD_TOKEN_EXPIRATION)));
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "Check your email for Link", data: { otp, ttl, createdAt, prospectId } });
        }
        if (subscriberId) {
            const prospectId = await redisInstance.createForgetPasswordRequest({ userId: subscriberId, otp, ttl, createdAt, profileId: email });
            const token = generateToken({ id: subscriberId, email: checkUser.email });
            await sendEmail(checkUser.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordHTML(admiNewPasswordLink(token, config.server.FORGET_PASSWORD_TOKEN_EXPIRATION)));
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "Check your email for Link", data: { otp, ttl, createdAt, prospectId } });
        }
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const forgotPasswordOtp = async (req: Request, res: Response, next: NextFunction) => {
    const { otp, prospectId } = req.body;

    try {
        const cachedUserInfo = await redisInstance.fetchForgetPasswordRequest(prospectId);
        if (_.isEmpty(cachedUserInfo)) return next({ statusCode: 409, message: "OTP has expired" });
        await redisInstance.removeForgetPasswordRequest(prospectId);

        const cachedOTP = cachedUserInfo.otp as unknown as number;
        if (otp !== cachedOTP) return next({ statusCode: 409, message: "invalid OTP" });
        const cachedCreatedAt = cachedUserInfo.createdAt as unknown as MomentInput;
        const otpTimeDifference = moment(moment.utc().format()).diff(moment(cachedCreatedAt)) / 1000;
        if (otpTimeDifference > config.server.OTP_TTL) return next({ statusCode: 409, message: "OTP has expired" });
        const token = generateToken({ id: cachedUserInfo.userId, email: cachedUserInfo.profileId }, config.server.FORGET_PASSWORD_TOKEN_EXPIRATION);
        return res.status(200).json({ success: true, token, validity: config.server.FORGET_PASSWORD_TOKEN_EXPIRATION, message: "create a new password, valid for 5 minutes", cachedCreatedAt, otpTimeDifference });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = {
            token: req.params.token,
            reason: "utilized",
            createdAt: moment.utc().format(),
        };

        await redisInstance.blacklistUser(data);
        const { id, subscriberId, adminId } = req.user as unknown as IUser;
        const user = await prisma.users.findUnique({ where: { id } });
        if (!user) return res.status(400).json({ message: "user does not exist" });
        const hashedPassword = await generateHash(req.body.password);
        user.password = hashedPassword;
        if (subscriberId) {
            const subscriberInfo = await prisma.subscribers.findUnique({ where: { id: subscriberId } });
            sendEmail(subscriberInfo?.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordConfirmationHTML(subscriberInfo?.email));
        }
        if (adminId) {
            const adminInfo = await prisma.admin.findUnique({ where: { id: adminId } });
            sendEmail(user.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordConfirmationHTML(adminInfo?.email));
        }
        return res.status(200).json({ success: true, message: "password updated successfully" });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, subscriberId, adminId } = req.user as unknown as IUser;
        const hashedPasssword = await generateHash(req.body.password);
        await prisma.users.update({ where: { id }, data: { password: hashedPasssword } });
        if (subscriberId) {
            const subscriberInfo = await prisma.subscribers.findUnique({ where: { id: subscriberId } });
            sendEmail(subscriberInfo?.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordConfirmationHTML(subscriberInfo?.email));
        }
        if (adminId) {
            const admin = await prisma.admin.findUnique({ where: { id: adminId } });
            sendEmail(admin?.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordConfirmationHTML(admin?.email));
        }
        return res.status(200).json({ success: true, message: "password updated successfully" });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};
