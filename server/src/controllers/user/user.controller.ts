import { Request, Response } from "express";
import { logger } from "../../common/logger";
import { PrismaClient, Prisma } from "@prisma/client";
import { makeid } from "../../common/generateString";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { IUser } from "./user.interface";
import { generateHash } from "../../common/generateHash";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const { first_name, last_name, email, password } = req.body;
    try {
        const getUser: IUser | null = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (getUser) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User already exists" });
        }
        const voucher = makeid(10);
        const hashedPasssword = await generateHash(password);
        const newUser: IUser = await prisma.users.create({ data: { first_name, last_name, email, password: hashedPasssword, voucher } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new user created", newUser });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new user cannot be created with this email" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e });
        }
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e });
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
    const { id } = req.params;
    try {
        const findUser = await prisma.users.findUnique({ where: { id: Number(id) } });
        if (!findUser) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User does not exist" });
        }
        await prisma.users.delete({ where: { id: Number(id) } });
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
