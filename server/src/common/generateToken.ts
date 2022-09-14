import jwt from "jsonwebtoken";
import config from "../config";

const { secret, tokenExpirationTime } = config.server;

// default expirtion date of 14 days (2 weeks)
export const generateToken = (param: { id: number; email: string }, expirations = tokenExpirationTime) => jwt.sign(param, secret, { expiresIn: expirations });
