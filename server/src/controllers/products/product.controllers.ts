import { logger } from "../../common/logger";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { Request, Response } from "express";
import { IUser } from "../auth/auth.interface";

export const createProduct = async (req: Request, res: Response) => {
    const {} = req.body;

    const { adminId } = req.user as unknown as IUser;

    try {
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request" });
    }
};
