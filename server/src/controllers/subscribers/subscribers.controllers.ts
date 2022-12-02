import { PrismaClient } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { logger } from "../../common/logger";
import { RedisClient } from "../../db/class";
import { paginatorCleaner } from "../../common/paginatorCleaner";
import { selectList } from "../../common/selectList";
import { IUser } from "../auth/auth.interface";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const getSubscribers = async (req: Request, res: Response, next: NextFunction) => {
    const { pgnumber, pgsize } = req.query as unknown as { pgnumber: string; pgsize: string };
    try {
        const cachedSubscribersRecord = await redisInstance.getSubscribers();

        const cleanedCachedSubscribersRecord = cachedSubscribersRecord && paginatorCleaner(cachedSubscribersRecord.length, pgnumber, pgsize);

        const getAllSubscribers = await prisma.subscribers.findMany();

        if (cachedSubscribersRecord.length === getAllSubscribers.length)
            return res.status(200).json({
                success: true,
                message: "subscribers fetched successfully",
                data: {
                    counts: cleanedCachedSubscribersRecord.counts,
                    pagesize: cleanedCachedSubscribersRecord.pagesize,
                    pagenumber: cleanedCachedSubscribersRecord.pagenumber,
                    totalpages: cleanedCachedSubscribersRecord.totalpages,
                    haspreviouspage: cleanedCachedSubscribersRecord.haspreviouspage,
                    hasnextpage: cleanedCachedSubscribersRecord.hasnextpage,
                    resources: selectList([...cachedSubscribersRecord], ["__v", "createdAt", "updatedAt", "userId", ""]).splice(cleanedCachedSubscribersRecord.skip, cleanedCachedSubscribersRecord.limit),
                },
            });

        const { skip, limit, counts, pagesize, pagenumber, totalpages, haspreviouspage, hasnextpage } = paginatorCleaner(getAllSubscribers.length, pgnumber, pgsize);

        return res.status(200).json({
            success: true,
            message: "getAllSubscribers fetched successfully",
            data: { counts, pagesize, pagenumber, totalpages, haspreviouspage, hasnextpage, resources: selectList(getAllSubscribers, ["__v", "updatedAt", "password", "agreement", "subscriberId", "userId"]).splice(skip, limit) },
        });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const getSingleSubscriber = async (req: Request, res: Response, next: NextFunction) => {
    const { subscriberId } = req.user as unknown as IUser;
    try {
        const findUser = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!findUser) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "subscriber does not exist" });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "User found", subscriber: { findUser } });
    } catch ({ message, statusCode }) {
        logger.error({ message, statusCode });
        return next({ statusCode, message });
    }
};

export const updateSingleSubscriber = async (req: Request, res: Response, next: NextFunction) => {
    const { subscriberId } = req.user as unknown as IUser;
    const { email, phone, username } = req.body;
    try {
        const findSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!findSubscriber) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User not found" });
        }
        if (email) {
            try {
                Promise.all([prisma.users.update({ where: { subscriberId: Number(subscriberId) }, data: { email } }), prisma.subscribers.update({ where: { id: Number(subscriberId) }, data: { email } })]);
            } catch (error) {
                logger.error(error);
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured", error });
            }
        }
        await prisma.subscribers.update({ where: { id: Number(subscriberId) }, data: { phone, username } });
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "subscriber updated", findSubscriber });
    } catch ({ message, statusCode }) {
        logger.error({ message, statusCode });
        return next({ statusCode, message });
    }
};

export const deleteSubscriber = async (req: Request, res: Response, next: NextFunction) => {
    const { subscriberId } = req.user as unknown as IUser;

    try {
        const findSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!findSubscriber) {
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "User not found" });
        }
        await prisma.subscribers.delete({ where: { id: Number(subscriberId) } });
        return res.status(201).json({ message: "user deleted" });
    } catch (error) {
        logger.error(error);
        return next({ error, message: "error occured on delete subscriber" });
    }
};

export const getBlockedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const blockedUsers = await prisma.users.findMany({ where: { accountStatus: config.server.BLOCK_ACCOUNT_CODE } });

        if (!blockedUsers) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "users not found" });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "blocked users gotten", blockedUsers });
    } catch (error) {
        logger.error(error);
        return next({ error, message: "error occured on delete subscriber" });
    }
};
export const getDeletedUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedUsers = await prisma.users.findMany({ where: { accountStatus: config.server.DELETE_ACCOUNT_CODE } });

        if (!deletedUsers) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "users not found" });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "blocked users gotten", deletedUsers });
    } catch (error) {
        logger.error(error);
        return next({ error, message: "error occured on delete subscriber" });
    }
};
