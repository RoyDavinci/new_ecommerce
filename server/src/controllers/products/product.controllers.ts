import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { generateHash } from "../../common/generateHash";
import { logger } from "../../common/logger";
import { IProducts } from "./products.interfaces";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createProduct = async (req: Request, res: Response) => {
    const { name, images, quantity, price, categoryId, description } = req.body;

    const { adminId, subscriberId } = req.user as unknown as IUser;

    try {
        let newProducts: IProducts;

        const findAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
        const findSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!findAdmin || !findSubscriber) {
            return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "error on create product" });
        }
        const findCategory = await prisma.category.findUnique({ where: { id: Number(categoryId) } });

        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "category does not exist" });
        if (adminId) {
            newProducts = await prisma.product.create({ data: { name, images, quantity, price, categoryId: findCategory.id, description, adminId: findAdmin.id } });
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
        }
        if (subscriberId) {
            newProducts = await prisma.product.create({ data: { name, images, quantity, price, categoryId: findCategory.id, description, sellerId: findSubscriber.id } });
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
        }
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const deleteProducts = async (req: Request, res: Response) => {
    const { adminId, subscriberId } = req.user as unknown as IUser;

    const { id } = req.params;

    try {
        const findProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (!findProduct) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "product not found" });
        if (subscriberId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM Products WHERE id = ${Number(id)} AND sellerId = ${Number(subscriberId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            await prisma.product.delete({ where: { id: Number(id) } });
            return res.status(200).json({ message: "prodict deleted" });
        }
        if (adminId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM Products WHERE id = ${Number(id)} AND adminId = ${Number(adminId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            await prisma.product.delete({ where: { id: Number(id) } });
            return res.status(200).json({ message: "prodict deleted" });
        }
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    const { adminId, subscriberId } = req.user as unknown as IUser;
    const { name, images, quantity, price, categoryId, description } = req.body;
    const { id } = req.params;

    try {
        const findProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (!findProduct) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "product not found" });

        const findCategory = await prisma.category.findUnique({ where: { id: Number(categoryId) } });

        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "category does not exist" });

        if (subscriberId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM Products WHERE id = ${Number(id)} AND sellerId = ${Number(subscriberId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            if (findCategory.id) {
                await prisma.product.update({ where: { id: Number(id) }, data: { name, images, quantity, price, categoryId: findCategory.id, description, adminId: Number(adminId) } });
                return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "product updated" });
            }

            return res.status(200).json({ message: "prodict deleted" });
        }
        if (adminId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM Products WHERE id = ${Number(id)} AND adminId = ${Number(adminId)}`;
            if (findCategory.id) {
                await prisma.product.update({ where: { id: Number(id) }, data: { name, images, quantity, price, categoryId: findCategory.id, description, adminId: Number(adminId) } });
                return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "product updated" });
            }
            return res.status(200).json({ message: "prodict deleted" });
        }
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const allProducts = await prisma.product.findMany();
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: allProducts });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getSingleProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const getProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: getProduct });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getProductByCategory = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
        const findCategory = await prisma.category.findUnique({ where: { id: Number(categoryId) } });

        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "category does not exist" });

        const getProduct = await prisma.product.findMany();
        const filteredProduct = getProduct.filter((product) => product.categoryId === Number(categoryId));
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: filteredProduct });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};
