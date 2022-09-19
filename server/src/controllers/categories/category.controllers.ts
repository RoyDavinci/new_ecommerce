import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "@src/constant/httpCodes";
import { RedisClient } from "../../db/class";
import { IUser } from "../auth/auth.interface";
import { logger } from "@src/common/logger";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createCatrgory = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;

    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });
        const newCategory = await prisma.category.create({ data: { name, description } });
        res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category created", newCategory });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const updateCategories = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description } = req.body;
    const { id } = req.params;
    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });

        const findCategory = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Category not found" });

        await prisma.category.update({ where: { id: Number(id) }, data: { name, description } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category updated" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });

        const findCategory = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Category not found" });

        await prisma.category.delete({ where: { id: Number(id) } });

        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category deleted" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getCategories = async (req: Request, res: Response) => {
    try {
        const getAllCategories = await prisma.category.findMany();
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "categories gotten", getAllCategories });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getCategory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const findCategory = await prisma.category.findUnique({ where: { id: Number(id) } });
        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Category not found" });
        const catergory = await prisma.category.findUnique({ where: { id: Number(id) } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category gotten", catergory });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};
