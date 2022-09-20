import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { generateHash } from "../../common/generateHash";
import { logger } from "../../common/logger";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createNewSeller = async (req: Request, res: Response) => {
    const { businessName, businessType, shopAddress, phone, image, homeAddress, phone1, email, first_name, last_name, password, username, address } = req.body;
    const { subscriberId } = req.user as unknown as IUser;

    try {
        if (subscriberId) {
            const searchSubscriber = await prisma.users.findUnique({ where: { id: Number(subscriberId) } });

            if (!searchSubscriber) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user not found" });

            const newSeller = await prisma.sellers.create({ data: { businessType, businessName, shopAddress, phone, image, homeAddress, phone1 } });

            await prisma.subscribers.update({ where: { id: Number(subscriberId) }, data: { sellerId: newSeller.id } });

            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new seller created", newSeller });
        }
        const hashedPassword = await generateHash(password);

        const newSubscriber = await prisma.subscribers.create({ data: { email, address, username, role: "seller", phone: phone1 } });

        await prisma.users.create({ data: { email, first_name, last_name, password: hashedPassword, role: "seller", subscriberId: newSubscriber.id } });

        const newSeller = await prisma.sellers.create({ data: { businessType, businessName, shopAddress, phone, image, homeAddress, phone1 } });

        await prisma.subscribers.update({ where: { id: newSubscriber.id }, data: { sellerId: newSeller.id } });

        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new seller created", newSeller });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new user cannot be created with this email" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e });
        }
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e, message: "an error occured on creating a user" });
    }
};

export const deleteSeller = async (req: Request, res: Response) => {
    const { subscriberId } = req.user as unknown as IUser;

    try {
        const checkSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!checkSubscriber) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "seller does not exist" });
        if (checkSubscriber.sellerId) {
            Promise.all([
                await prisma.subscribers.delete({ where: { id: Number(subscriberId) } }),
                await prisma.users.delete({ where: { subscriberId: Number(subscriberId) } }),
                await prisma.sellers.delete({ where: { id: checkSubscriber.sellerId } }),
            ]);
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "seller deleted" });
        }
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "cannot find seller on subscriber id" });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new user cannot be created with this email" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e });
        }
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e, message: "an error occured on creating a user" });
    }
};
