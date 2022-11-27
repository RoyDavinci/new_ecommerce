import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, product } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { logger } from "../../common/logger";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { streamUpload } from "../../utils/streamifier";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createProduct = async (req: Request, res: Response) => {
    const { name, quantity, price, description, make, model, year, categoryName } = req.body;
    logger.info("gotten to req.body");
    try {
        let newProducts: product;

        if (req.user) {
            const { adminId, subscriberId } = req.user as unknown as IUser;
            logger.info("gotten to check admin");
            const findAdmin = await prisma.admin.findUnique({ where: { id: Number(adminId) } });
            logger.info("gotten to find admin");
            const findSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
            logger.info("gotten to find subscriber");
            if (!findAdmin && !findSubscriber) {
                return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "error on create products", adminId, subscriberId });
            }
            logger.info("gotten to verify subscriber admin");
            let num: number = 0;
            console.log(JSON.stringify(req.body));
            const checkCategoryName = await prisma.category.findUnique({ where: { name: categoryName } });

            if (!checkCategoryName) {
                const newCategory = await prisma.category.create({ data: { name: categoryName, description: ` description for ${name}` } });
                num = newCategory.id;
            }
            if (checkCategoryName) {
                num = checkCategoryName.id;
            }

            if (adminId) {
                logger.info(adminId);
                if (!findAdmin?.id) return res.status(403).json({ message: "cannoot create product" });
                const value: string[] = [];
                logger.info(value);
                const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
                logger.info(JSON.stringify(result));
                if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
                value.push(result.secure_url);
                if (num > 0) {
                    newProducts = await prisma.product.create({ data: { name, images: value, quantity: Number(quantity), price, categoryId: num, description, adminId: findAdmin.id, make, model, year } });
                    return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
                }
                newProducts = await prisma.product.create({ data: { name, images: value, quantity: Number(quantity), price, categoryId: num, description, adminId: findAdmin.id, make, model, year } });
                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
            }
            if (subscriberId) {
                if (!findSubscriber?.sellerId) return res.status(403).json({ message: "cannoot create product" });
                const value: string[] = [];
                const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
                if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
                value.push(result.secure_url);
                if (num > 0) {
                    newProducts = await prisma.product.create({ data: { name, images: value, quantity: Number(quantity), price, categoryId: num, description, adminId: findSubscriber.id, make, model, year } });
                    return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "product created", product: { newProducts } });
                }
                newProducts = await prisma.product.create({ data: { name, images: value, quantity: Number(quantity), price, categoryId: num, description, adminId: findSubscriber.id, make, model, year } });
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
                await prisma.product.delete({ where: { id: Number(id) }, include: { productRatings: true } });
                return res.status(200).json({ message: "product deleted" });
            }
            if (adminId) {
                const findUnique = await prisma.$queryRaw`SELECT * FROM Product WHERE id = ${Number(id)} AND "adminId" = ${Number(adminId)}`;
                if (!findUnique) return res.status(400).json({ message: "product not found" });
                await prisma.product.delete({ where: { id: Number(id) }, include: { productRatings: true } });
                return res.status(200).json({ message: "product deleted" });
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
    const { name, quantity, price, categoryName, description } = req.body;
    const { id } = req.params;

    try {
        const findProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (!findProduct) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "product not found" });
        let categoryId: number = 0;
        logger.info(JSON.stringify(req.body));

        const category = await prisma.category.findUnique({ where: { name: categoryName } });
        if (!category) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "category not found" });
        categoryId = category.id;
        const value: string[] = [];
        if (req.file) {
            logger.info(value);
            const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
            logger.info(JSON.stringify(result));
            if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
            value.push(result.secure_url);
            if (subscriberId) {
                const findUnique = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${Number(id)} AND "sellerId" = ${Number(subscriberId)}`;
                if (!findUnique) return res.status(400).json({ message: "product not found" });
                await prisma.product.update({ where: { id: Number(id) }, data: { name, images: value, quantity: Number(quantity), price, categoryId: categoryId, description, adminId: Number(adminId) } });
            }
            if (adminId) {
                const findUnique = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${Number(id)} AND "adminId" = ${Number(adminId)}`;
                if (!findUnique) return res.status(400).json({ message: "product not found" });
                await prisma.product.update({ where: { id: Number(id) }, data: { name, images: value, quantity: Number(quantity), price, categoryId: categoryId, description, adminId: Number(adminId) } });
                return res.status(HTTP_STATUS_CODE.CREATED).json({ message: "product updated" });
            }
        }
        if (subscriberId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${Number(id)} AND "sellerId" = ${Number(subscriberId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            await prisma.product.update({ where: { id: Number(id) }, data: { name, quantity: Number(quantity), price, categoryId: Number(categoryId), description, adminId: Number(adminId) } });

            return res.status(200).json({ message: "prodict deleted" });
        }
        if (adminId) {
            const findUnique = await prisma.$queryRaw`SELECT * FROM product WHERE id = ${Number(id)} AND "adminId" = ${Number(adminId)}`;
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            if (!findUnique) return res.status(400).json({ message: "product not found" });
            await prisma.product.update({ where: { id: Number(id) }, data: { name, quantity: Number(quantity), price, categoryId: Number(categoryId), description, adminId: adminId } });
            return res.status(200).json({ message: "prodict updated" });
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
        const getProduct = await prisma.product.findUnique({ where: { id: Number(id) }, include: { productRatings: true } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: getProduct });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const getProductByCategoryId = async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    try {
        const findCategory = await prisma.category.findUnique({ where: { name: categoryId } });

        if (!findCategory) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "category does not exist" });

        const getProduct = await prisma.product.findMany({ where: { categoryId: findCategory.id }, include: { productRatings: true } });
        // const filteredProduct = getProduct.filter((product) => product.categoryId === findCategory.id);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: getProduct });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};

export const searchByProductName = async (req: Request, res: Response) => {
    const { productName } = req.body;

    try {
        const results = await prisma.product.findMany({ where: { name: { search: productName } } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "data gotten", results });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};
