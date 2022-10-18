import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { logger } from "../../common/logger";

const prisma = new PrismaClient();

export const addRating = async (req: Request, res: Response) => {
    const { rating } = req.body;

    const { id } = req.params;

    try {
        const getProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
        if (!getProduct) return res.status(400).json({ message: "product not found" });
        const findRating = await prisma.productRatings.findUnique({ where: { productId: Number(id) } });
        if (findRating) {
            await prisma.productRatings.update({ where: { productId: Number(id) }, data: { amount: { increment: 5 }, rating: { increment: Number(rating) } } });
            return res.status(201).json({ message: "rating updated" });
        }
        await prisma.productRatings.create({ data: { amount: 5, rating: Number(rating), productId: Number(id) } });
        return res.status(201).json({ message: "rating added" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};
