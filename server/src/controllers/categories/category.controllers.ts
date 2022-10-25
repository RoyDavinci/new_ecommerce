import { NextFunction, Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { IUser } from "../auth/auth.interface";
import { logger } from "../../common/logger";
import { streamUpload } from "../../utils/streamifier";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

const redisInstance: RedisClient = new RedisClient();

const prisma = new PrismaClient();

export const createCatrgory = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const { adminId, subscriberId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        const checkSeller = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });

        if (!checkAdmin || checkSeller?.sellerId) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Admin not found" });
        let image: string = "";
        if (req.file) {
            const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
            if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
            image = result.secure_url;
        }
        const newCategory = await prisma.category.create({ data: { name, description, images: image } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category created", newCategory });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new category cannot be created with this name" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error });
        }
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
        let image: string = "";
        if (req.file) {
            const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
            if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
            image = result.secure_url;
        }

        const updatedCategory = await prisma.category.update({ where: { id: Number(id) }, data: { name, description, images: image } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category updated", updatedCategory });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new user cannot be created with this email" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error });
        }
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

export const getCategoryByName = async (req: Request, res: Response) => {
    const { name } = req.params;

    try {
        const findCategory = await prisma.category.findUnique({ where: { name } });
        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "Category not found" });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "category gotten", findCategory });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};
