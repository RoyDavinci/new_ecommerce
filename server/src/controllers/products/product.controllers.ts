import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { generateHash } from "../../common/generateHash";
import { logger } from "../../common/logger";
import { IProducts } from "./products.interfaces";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createProduct = async (req: Request, res: Response) => {
    const { name, quantity, price, categoryId, description } = req.body;

    try {
        let newProducts: IProducts;

        if (req.user) {
            const { adminId, subscriberId } = req.user as unknown as IUser;
            const findAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
            const findSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
            if (!findAdmin && !findSubscriber) {
                return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "error on create products", adminId, subscriberId });
            }
            const findCategory = await prisma.category.findUnique({ where: { id: Number(categoryId) } });

            if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "category does not exist" });
            if (adminId) {
                if (!findAdmin?.id) return res.status(403).json({ message: "cannoot create product" });
                const value: string[] = [];
                if (req.files) {
                    const files = req.files as unknown as Express.Multer.File[];
                    for (const file of files) {
                        const { path } = file;
                        await cloudinary.uploader.upload(path, { public_id: uuidv4(), folder: "sellers" }, function (error, result) {
                            if (error) return res.status(400).json({ message: error });
                            if (result) value.push(result.secure_url);
                            fs.unlink(path, function (err) {
                                if (err) return res.status(400).json({ message: err });
                            });
                        });
                    }
                }

                newProducts = await prisma.product.create({ data: { name, images: value, quantity: Number(quantity), price, categoryId: findCategory.id, description, adminId: findAdmin.id } });
                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
            }
            if (subscriberId) {
                if (!findSubscriber?.sellerId) return res.status(403).json({ message: "cannoot create product" });
                const value: string[] = [];
                if (req.files) {
                    const files = req.files as unknown as Express.Multer.File[];

                    for (const file of files) {
                        const { path } = file;
                        await cloudinary.uploader.upload(path, { public_id: uuidv4(), folder: "sellers" }, function (error, result) {
                            if (error) return res.status(400).json({ message: error });
                            if (result) value.push(result.secure_url);
                            fs.unlink(path, function (err) {
                                if (err) return res.status(400).json({ message: err });
                            });
                        });
                    }
                }
                newProducts = await prisma.product.create({ data: { name, images: value, quantity: Number(quantity), price, categoryId: findCategory.id, description, sellerId: findSubscriber.sellerId } });
                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
            }
        }
        return res.status(403).json({ message: "authentication needed" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};

export const deleteProducts = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (req.user) {
            const { adminId, subscriberId } = req.user as unknown as IUser;
            const findProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
            if (!findProduct) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "product not found" });
            if (subscriberId) {
                const findUnique = await prisma.$queryRaw`SELECT * FROM Product WHERE id = ${Number(id)} AND sellerId = ${Number(subscriberId)}`;
                if (!findUnique) return res.status(400).json({ message: "product not found" });
                await prisma.product.delete({ where: { id: Number(id) } });
                return res.status(200).json({ message: "prodict deleted" });
            }
            if (adminId) {
                const findUnique = await prisma.$queryRaw`SELECT * FROM Product WHERE id = ${Number(id)} AND "adminId" = ${Number(adminId)}`;
                if (!findUnique) return res.status(400).json({ message: "product not found" });
                await prisma.product.delete({ where: { id: Number(id) } });
                return res.status(200).json({ message: "prodict deleted" });
            }
        }
        return res.status(403).json({ message: "authentication needed" });
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
            const findUnique = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${Number(id)} AND "sellerId" = ${Number(subscriberId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            if (findCategory.id) {
                await prisma.product.update({ where: { id: Number(id) }, data: { name, images, quantity, price, categoryId: findCategory.id, description, adminId: Number(adminId) } });
                return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "product updated" });
            }

            return res.status(200).json({ message: "prodict deleted" });
        }
        if (adminId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${Number(id)} AND "adminId" = ${Number(adminId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
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
