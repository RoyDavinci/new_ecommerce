import { PrismaClient } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { logger } from "../../common/logger";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { flutterWaveResponse, paystackResponse } from "./transactions.interface";

const prisma = new PrismaClient();

export const startTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    try {
        const checkOrder = await prisma.orders.findUnique({ where: { id: Number(orderId) } });
        if (!checkOrder) return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({ message: "order does not exist" });
        if (checkOrder.payment_type.toLowerCase() === "paystack") {
            const { data } = await axios.post(
                "https://api.paystack.co/transaction/initialize",
                { amount: checkOrder.total_amount, email: checkOrder.email },
                {
                    headers: {
                        Authorization: `Bearer ${config.server.PAYSTACK_SECRET_KEY}`,
                    },
                },
            );
            const response = data as paystackResponse;
            if (response.status) {
                const createTransaction = await prisma.transaction.create({
                    data: {
                        orderId: checkOrder.id,
                        payment_type: checkOrder.payment_type,
                        total_amount: checkOrder.total_amount,
                        biller_Reference: response.data.reference,
                        email: checkOrder.email,
                        phone: checkOrder.phone,
                        status: "pending",
                        transaction_reference: uuid(),
                    },
                });
                return res.status(200).json({ link: response.data.authorization_url, transactionId: createTransaction.id });
            }
            return res.status(400).json({ message: "an error occured", data });
        }
        const transRef: string = uuid();
        const { data } = await axios.post(
            "https://api.flutterwave.com/v3/payments",
            {
                tx_ref: transRef,
                amount: checkOrder.total_amount,
                currency: "NGN",
                redirect_url: "https://localhost:3000",
                customer: {
                    email: checkOrder.email,
                    phonenumber: checkOrder.phone,
                    name: checkOrder.name,
                },
            },
            { headers: { Authorization: `Bearer ${config.server.FLUTTERWAVE_SECRET_KEY}` } },
        );
        const response = data as flutterWaveResponse;
        if (response.data.success === "failed") return res.status(400).json({ message: " transaction failed" });
        const createTransaction = await prisma.transaction.create({
            data: {
                orderId: checkOrder.id,
                payment_type: checkOrder.payment_type,
                total_amount: checkOrder.total_amount,
                biller_Reference: transRef,
                email: checkOrder.email,
                phone: checkOrder.phone,
                status: "pending",
                transaction_reference: uuid(),
            },
        });

        return res.status(200).json({ link: response.data.data.link, transactionId: createTransaction.id });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time", error });
    }
};

export const verifyTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { requestId } = req.body;

    try {
    } catch (error) {}
};
