import { Request, Response } from "express";
import { logger } from "../../common/logger";
import { PrismaClient, Prisma } from "@prisma/client";
import { makeid } from "../../common/generateString";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { IUser } from "./auth.interface";
import { generateHash } from "../../common/generateHash";
import { generateToken } from "../../common/generateToken";
import config from "../../config";
import connectRedisCache, { createProspectiveUser } from "../../db/redis";
import { generateOTP } from "../..//common/generateOtp";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password, username, phone } = req.body;

    try {
        await connectRedisCache();

        const checkEmail = await prisma.users.findUnique({ where: { email } });
        if (checkEmail) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user already exist" });
        const { otp, ttl, createdAt } = await generateOTP();

        const prospectId = await createProspectiveUser({ first_name, last_name, otp, ttl, createdAt, email, password, username, phone });
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
    const { id } = req.user as unknown as IUser;
    try {
        const findUser = await prisma.users.findUnique({ where: { id } });
        if (!findUser) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User does not exist" });
        }
        await prisma.users.delete({ where: { id } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "User deleted" });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    try {
        const findUser = await prisma.users.findUnique({ where: { id: Number(id) } });
        if (!findUser) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User does not exist" });
        }
        if (password) {
            const hashedPasssword = await generateHash(password);
            await prisma.users.update({ where: { id: Number(id) }, data: { first_name, last_name, password: hashedPasssword, email } });
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "user updated", user: { findUser } });
        }
        await prisma.users.update({ where: { id: Number(id) }, data: { first_name, last_name, email } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "user updated", user: { findUser } });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};

export const signIn = async (req: Request, res: Response) => {
    const { id, email } = req.user as unknown as IUser;
    try {
        const additionInfo = await prisma.users.findUnique({ where: { id } });
        return res.status(200).json({ success: true, token: generateToken({ id, email }), validity: config.server.tokenExpirationTime, data: { user: additionInfo } });
    } catch (error) {
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error });
    }
};
