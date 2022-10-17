import { Request, Response, NextFunction } from "express";
import passport from "passport";
import statusCodes from "../constant/httpCodes";
import { RedisClient } from "../db/class";

const redisInstance: RedisClient = new RedisClient();
export const authenticateLocal = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return passport.authenticate("local", (error: Error, user, info: { message: string }) => {
            if (error) return next({ statusCode: statusCodes.FORBIDDEN, message: error.message });
            if (!user) return next({ statusCode: statusCodes.NOT_FOUND, message: info.message });
            return req.logIn(user, (err) => {
                if (err) return next({ statusCode: statusCodes.FORBIDDEN, message: err.message });
                return next();
            });
        })(req, res, next);
    } catch (error) {
        return next({ message: "wrong username/password", statusCode: statusCodes.NOT_ACCEPTABLE });
    }
};

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return next({ statusCode: statusCodes.PROXY_AUTHENTICATION_REQUIRED, message: "header token needed" });
    const token = req.headers.authorization.split(" ")[1];
    const tokenBlackListCheck = await redisInstance.searchBlaclklistedUsers(token);
    if (tokenBlackListCheck.length) return next({ statusCode: statusCodes.UNAUTHORIZED, message: `invalid credential` });

    return passport.authenticate("jwt", (error: Error, user, info) => {
        if (error) return next({ statusCode: statusCodes.FORBIDDEN, message: error.message, data: "error" });
        if (!user) return next({ statusCode: statusCodes.NOT_FOUND, message: info.message });
        return req.logIn(user, (err) => {
            if (err) return next({ statusCode: statusCodes.FORBIDDEN, message: err.message });
            return next();
        });
    })(req, res, next);
};

export const authenticateAdminJWT = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return next({ statusCode: statusCodes.PROXY_AUTHENTICATION_REQUIRED, message: "admin authorization needed" });

    return passport.authenticate("jwt", (error: Error, user, info) => {
        if (error) return next({ statusCode: statusCodes.FORBIDDEN, message: error.message });
        if (!user) return next({ statusCode: statusCodes.NOT_FOUND, message: info.message });
        if (!user.adminId) return next({ statusCode: statusCodes.FORBIDDEN, message: "unauthorized" });
        return req.logIn(user, (err) => {
            if (err) return next({ statusCode: statusCodes.FORBIDDEN, message: err.message });
            return next();
        });
    })(req, res, next);
};

export const optionalAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        return passport.authenticate("jwt", (error: Error, user, info) => {
            if (error) return next({ statusCode: statusCodes.FORBIDDEN, message: error.message, data: "error" });
            if (!user) return next({ statusCode: statusCodes.NOT_FOUND, message: info.message });
            return req.logIn(user, (err) => {
                if (err) return next({ statusCode: statusCodes.FORBIDDEN, message: err.message });
                return next();
            });
        })(req, res, next);
    } else {
        return next();
    }
};
