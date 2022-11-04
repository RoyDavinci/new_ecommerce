import { Request, Response } from "express";
import moment from "moment";
import CryptoJS from "crypto-js";
import axios from "axios";

export const checkHealth = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "ecommerce is alive" });
};
