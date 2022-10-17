import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { logger } from "../../common/logger";
import { IUser } from "../auth/auth.interface";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const addNewShippers = async (req: Request, res: Response) => {
    const { name, places, contact, price, lagos } = req.body;
    try {
        const { adminId } = req.user as unknown as IUser;
        if (!adminId) return res.status(400).json({ message: "only admins can create shipping" });
        const shipperRepository = await redisInstance.createProspectiveShipper({ name, places, contact, price, lagos: lagos === "true" ? true : false });
        const createShipper = await prisma.shippers.create({ data: { name, places, contact, price, lagos: lagos === "true" ? true : false } });
        return res.status(HTTP_STATUS_CODE.CREATED).json({ createShipper, shipperRepository });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: "error on creating shipping", error });
    }
};

export const getAllShipping = async (req: Request, res: Response) => {
    try {
        const shippers = await redisInstance.fetchProspectiveShipper();
        return res.status(200).json({ message: "got shipping", shippers });
    } catch (error) {
        logger.error(error);
        return res.status(400).json({ message: "error on get shipping", error });
    }
};
