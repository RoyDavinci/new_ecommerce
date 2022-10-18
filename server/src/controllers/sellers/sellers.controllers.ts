import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { generateHash } from "../../common/generateHash";
import { logger } from "../../common/logger";
import { streamUpload } from "../../utils/streamifier";
import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

const prisma = new PrismaClient();

export const createNewSeller = async (req: Request, res: Response) => {
    const { businessName, businessType, shopAddress, phone, homeAddress, phone1, email, first_name, last_name, password, username } = req.body;

    try {
        if (req.user) {
            const { subscriberId } = req.user as unknown as IUser;
            if (subscriberId) {
                const searchSubscriber = await prisma.users.findUnique({ where: { id: Number(subscriberId) } });
                if (!searchSubscriber) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "user not found" });
                const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
                logger.info(JSON.stringify(result));
                if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
                const newSeller = await prisma.sellers.create({ data: { businessType, businessName, shopAddress, phone, image: result.secure_url, homeAddress, phone1 } });
                await prisma.subscribers.update({ where: { id: Number(subscriberId) }, data: { sellerId: newSeller.id } });
                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new seller created", newSeller });
            }
        } else {
            try {
                const hashedPassword = await generateHash(password);
                const newSubscriber = await prisma.subscribers.create({ data: { email, address: homeAddress, username, role: "seller", phone: phone1 } });
                await prisma.users.create({ data: { email, first_name, last_name, password: hashedPassword, role: "seller", subscriberId: newSubscriber.id } });
                const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
                logger.info(JSON.stringify(result));
                if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
                const newSeller = await prisma.sellers.create({ data: { businessType, businessName, shopAddress, phone, image: result.secure_url, homeAddress, phone1 } });
                await prisma.subscribers.update({ where: { id: newSubscriber.id }, data: { sellerId: newSeller.id } });
                return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "new seller created", newSeller });
            } catch (error) {
                logger.error(error);
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error, message: "an error occured processing your request" });
            }
        }
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (error.code === "P2002") {
                logger.info("There is a unique constraint violation, a new user cannot be created with this email");
                return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "There is a unique constraint violation, a new user cannot be created with this email" });
            }
            return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error });
        }
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error, message: "an error occured on creating a user" });
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
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error, message: "an error occured on creating a user" });
    }
};

export const updateSeller = async (req: Request, res: Response) => {
    const { businessName, businessType, shopAddress, phone, homeAddress, phone1, email } = req.body;
    const { subscriberId } = req.user as unknown as IUser;

    try {
        const checkSubscriber = await prisma.subscribers.findUnique({ where: { id: Number(subscriberId) } });
        if (!checkSubscriber) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "seller does not exist" });

        let image: string = "";

        if (req.file) {
            const result = (await streamUpload(req)) as unknown as UploadApiResponse | UploadApiErrorResponse;
            logger.info(JSON.stringify(result));
            if (result.message) return res.status(result.http_code).json({ message: "error using cloudinary upload", data: result.message });
            image = result.secure_url;
        }

        if (checkSubscriber.sellerId) {
            const updateSeller = await prisma.sellers.update({ where: { id: checkSubscriber.sellerId }, data: { businessType, businessName, shopAddress, phone, image, homeAddress, phone1 } });
            if (email) {
                await prisma.users.update({ where: { subscriberId: checkSubscriber.id }, data: { email } });
                await prisma.subscribers.update({ where: { id: checkSubscriber.id }, data: { email } });
            }
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "seller updated", updateSeller });
        }
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "seller id not found on subscriber table" });
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
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error, message: "an error occured on creating a user" });
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
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error, message: "an error occured on creating a user" });
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
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ error: error, message: "an error occured on creating a user" });
    }
};
