import * as jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import HTTP_STATUS_CODE from "../constant/httpCodes";
import { IUser } from "../controllers/auth/auth.interface";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, `${process.env.JSON_TOKEN}`, (err, payload) => {
            if (err) {
                res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "Token is not valid", error: err });
            }
            req.user = payload as unknown as IUser;
            next();
        });
    } else {
        next();
    }
};
