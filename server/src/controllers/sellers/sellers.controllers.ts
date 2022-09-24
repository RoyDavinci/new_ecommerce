import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { generateHash } from "../../common/generateHash";
import { logger } from "../../common/logger";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createNewSeller = async (req: Request, res: Response) => {
    const { businessName, businessType, shopAddress, phone, homeAddress, phone1, email, first_name, last_name, password, username } = req.body;
    logger.info(req.body);

    try {
        if (req.user) {
            const { subscriberId } = req.user as unknown as IUser;
            if (subscriberId) {
                const searchSubscriber = await prisma.users.findUnique({ where: { id: Number(subscriberId) } });

                if (!searchSubscriber) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user not found" });
                let images: string = "";
                const files = req.file;
                if (files) {
                    const { path } = files;
                    await cloudinary.uploader.upload(path, { public_id: uuidv4(), folder: "sellers" }, function (error, result) {
                        if (error) return res.status(400).json({ message: error });
                        if (result) images = result.secure_url;
                        // fs.unlink(path, function (err) {
                        //     if (err) return res.status(400).json({ message: err });
                        // });
                    });
                }

                const newSeller = await prisma.sellers.create({ data: { businessType, businessName, shopAddress, phone, image: images, homeAddress, phone1 } });

                await prisma.subscribers.update({ where: { id: Number(subscriberId) }, data: { sellerId: newSeller.id } });

                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new seller created", newSeller });
            }
        }

        try {
            const hashedPassword = await generateHash(password);

            const newSubscriber = await prisma.subscribers.create({ data: { email, address: homeAddress, username, role: "seller", phone: phone1 } });

            await prisma.users.create({ data: { email, first_name, last_name, password: hashedPassword, role: "seller", subscriberId: newSubscriber.id } });
            let images: string = "";
            const files = req.file;
            return res.status(200).json({ files });
            // if (files) {
            //     const { path } = files;
            //     await cloudinary.uploader.upload(path, { public_id: uuidv4(), folder: "sellers" }, function (error, result) {
            //         if (error) return res.status(400).json({ message: error });
            //         if (result) images = result.secure_url;
            //         // fs.unlink(path, function (err) {
            //         //     if (err) return res.status(400).json({ message: err });
            //         // });
            //     });
            // }

            const newSeller = await prisma.sellers.create({ data: { businessType, businessName, shopAddress, phone, image: images, homeAddress, phone1 } });

            await prisma.subscribers.update({ where: { id: newSubscriber.id }, data: { sellerId: newSeller.id } });

            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new seller created", newSeller });
        } catch (error) {
            logger.error(error);
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error, message: "an error occured processing your request" });
        }
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
            try {
                await Promise.all([prisma.subscribers.delete({ where: { id: Number(subscriberId) } }), prisma.users.delete({ where: { subscriberId: Number(subscriberId) } }), prisma.sellers.delete({ where: { id: checkSubscriber.sellerId } })]);
                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "seller deleted" });
            } catch (error) {
                logger.error(error);
                return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: error });
            }
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
        logger.error(e);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: e, message: "an error occured on creating a user" });
    }
};

export const updateSeller = async (req: Request, res: Response) => {
    const { businessName, businessType, shopAddress, phone, image, homeAddress, phone1, email } = req.body;
    const { subscriberId } = req.user as unknown as IUser;

    try {
        const checkSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!checkSubscriber) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "seller does not exist" });

        if (checkSubscriber.sellerId) {
            const updateSeller = await prisma.sellers.update({ where: { id: checkSubscriber.sellerId }, data: { businessType, businessName, shopAddress, phone, image, homeAddress, phone1 } });
            if (email) {
                await prisma.users.update({ where: { subscriberId: checkSubscriber.id }, data: { email } });
                await prisma.subscribers.update({ where: { id: checkSubscriber.id }, data: { email } });
            }
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "seller updated", updateSeller });
        }
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "seller id not found on subscriber table" });
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

export const getSellers = async (req: Request, res: Response) => {
    try {
        if (req.user) {
            const { adminId } = req.user as unknown as IUser;
            const searchAdmin = await prisma.users.findUnique({ where: { id: Number(adminId) } });

            if (!searchAdmin) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user not found" });
            const getSellers = await prisma.sellers.findMany();
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "sellers gotten", getSellers });
        }
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
export const getSeller = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        if (req.user) {
            const { adminId } = req.user as unknown as IUser;
            const searchAdmin = await prisma.users.findUnique({ where: { id: Number(adminId) } });

            if (!searchAdmin) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user not found" });
            const getSellers = await prisma.sellers.findUnique({ where: { id: Number(id) } });
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "sellers gotten", getSellers });
        }
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
