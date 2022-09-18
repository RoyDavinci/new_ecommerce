import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "@src/constant/httpCodes";
import { RedisClient } from "../../db/class";
import { IUser } from "../auth/auth.interface";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createCatrgory = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });
        // const newCategory = await prisma.category.create({data:{name, description}})
    } catch (error) {}
};
