import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { logger } from "../../common/logger";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createSubCategory = async (req: Request, res: Response) => {
    const { name, categoryId } = req.body;
    const { adminId } = req.user as unknown as IUser;
    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });

        const checkCategory = await prisma.category.findUnique({ where: { id: Number(categoryId) } });
        if (!checkCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: `category with category id ${categoryId} does not exist` });
        const newSubCategory = await prisma.subCategory.create({ data: { name, categoryId: Number(categoryId) } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "sub category created", newSubCategory });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getSubCategory = async (req: Request, res: Response) => {
    const { subCategoryId } = req.params;

    try {
        const checkCategory = await prisma.subCategory.findUnique({ where: { id: Number(subCategoryId) } });
        if (!checkCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: `category with category id ${subCategoryId} does not exist` });

        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "sub category gotten", checkCategory });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getAllSubCategories = async (req: Request, res: Response) => {
    try {
        const subCategories = await prisma.subCategory.findMany();

        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "sub categories gotten", subCategories });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const updateSubCategories = async (req: Request, res: Response) => {
    const { subCategoryId } = req.params;
    const { name } = req.body;
    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });

        const checkCategory = await prisma.subCategory.findUnique({ where: { id: Number(subCategoryId) } });

        if (!checkCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: `category with category id ${subCategoryId} does not exist` });
        const editedSubCategory = await prisma.subCategory.update({ where: { id: Number(subCategoryId) }, data: { name } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "sub category edited", editedSubCategory });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
    const { subCategoryId } = req.params;
    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        if (!checkAdmin) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });

        const checkCategory = await prisma.subCategory.findUnique({ where: { id: Number(subCategoryId) } });

        if (!checkCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: `category with category id ${subCategoryId} does not exist` });

        await prisma.subCategory.delete({ where: { id: Number(subCategoryId) } });

        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "sub category deleted" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};
