import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "@src/constant/httpCodes";
import { NextFunction, Request, Response } from "express";
import { generateHash } from "../../common/generateHash";
import { generateToken } from "../../common/generateToken";
import config from "../../config";
import { logger } from "../../common/logger";
import { RedisClient } from "../../db/class";
import { sendEmail } from "../../common/sendMail";
import { adminNewPasswordHTML } from "../../common/adminNewPasswordHtml";
import { newPasswordUrlFormater } from "../../common/newPasswordUrlFormater";
import { paginatorCleaner } from "../../common/paginatorCleaner";
import { selectList, selectObject } from "../../common/selectList";
import { IUser } from "../auth/auth.interface";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createNewAdmin = async (req: Request, res: Response) => {
    const { email, first_name, last_name, password, role } = req.body;

    try {
        const hashedPasssword = await generateHash(password);
        if (role === "Super_Admin") {
            const checkAdmin = await prisma.admin.findFirst({ where: { role } });
            if (checkAdmin) {
                return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "cannot create another super admin" });
            }
        }

        const newAdmin = await prisma.admin.create({ data: { name: `${first_name} ${last_name}`, email, role } });

        const newUser = await prisma.users.create({ data: { first_name, last_name, password: hashedPasssword, email, role, adminId: newAdmin.id } });

        const token = generateToken({ role, id: newUser.id, email });
        sendEmail(req.body.email, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordHTML(newPasswordUrlFormater(token, "admin")));
        return res.status(201).json({ message: "new admin created successfully, password reset link sent to admin's mail", admin: newAdmin });
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

export const getAllAdmins = async (req: Request, res: Response, next: NextFunction) => {
    const { pgnumber, pgsize } = req.query as unknown as { pgnumber: string; pgsize: string };
    try {
        const cachedAdminsRecord = await redisInstance.getAdmins();
        const allAdmin = await prisma.admin.findMany();
        const cachedPaginatorInfo = cachedAdminsRecord && paginatorCleaner(cachedAdminsRecord.length, pgnumber, pgsize);
        if (cachedAdminsRecord.length === allAdmin.length)
            return res.status(200).json({
                success: true,
                message: "admins fetched successfully",
                data: {
                    counts: cachedPaginatorInfo.counts,
                    pagesize: cachedPaginatorInfo.pagesize,
                    pagenumber: cachedPaginatorInfo.pagenumber,
                    totalpages: cachedPaginatorInfo.totalpages,
                    haspreviouspage: cachedPaginatorInfo.haspreviouspage,
                    hasnextpage: cachedPaginatorInfo.hasnextpage,
                    admins: selectList([...cachedAdminsRecord], ["__v", "createdAt", "updatedAt", "userId"]).splice(cachedPaginatorInfo.skip, cachedPaginatorInfo.limit),
                },
            });

        redisInstance.setAdmins(allAdmin);
        const { skip, limit, counts, pagesize, pagenumber, totalpages, haspreviouspage, hasnextpage } = paginatorCleaner(allAdmin.length, pgnumber, pgsize);
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({
            success: true,
            message: "admins fetched successfully",
            data: { counts, pagesize, pagenumber, totalpages, haspreviouspage, hasnextpage, admins: selectList(allAdmin, ["__v", "createdAt", "updatedAt", "userId"]).splice(skip, limit) },
        });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const updateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { firstname, lastname, email, role } = req.body;
    const { adminId } = req.user as unknown as IUser;

    try {
        const checkAdmin = await prisma.admin.findUnique({ where: { id: Number(id) } });
        if (!checkAdmin) {
            return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "Admin does not exist" });
        }
        if (role && checkAdmin.role === config.server.SUPER_ADMIN_ROLE) {
            return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "Cannot update super admin role" });
        }

        if (email) {
            try {
                Promise.all([prisma.users.update({ where: { adminId: Number(adminId) }, data: { email } }), prisma.subscribers.update({ where: { id: Number(adminId) }, data: { email } })]);
            } catch (error) {
                logger.error(error);
                return next({ message: "error processing your data at this time" });
            }
        }

        const updateAdmin = await prisma.admin.update({ where: { id: Number(id) }, data: { role, name: `${firstname} ${lastname}` } });
        return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "Admin Updated", admin: { updateAdmin } });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};

export const deleteAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const { adminId, role } = req.user as unknown as IUser;

    try {
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time" });
    }
};
