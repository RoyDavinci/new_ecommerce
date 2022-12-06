import { PrismaClient } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { logger } from "../../common/logger";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { sendEmail } from "../../common/sendMail";
import { flutterWaveResponse, paystackResponse, paystackResponseVerification } from "./transactions.interface";
import { stubObject } from "lodash";

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
                        channel: checkOrder.payment_type,
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
                channel: checkOrder.payment_type,
            },
        });

        return res.status(200).json({ link: response.data.data.link, transactionId: createTransaction.id });
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time", error });
    }
};

export const verifyTransaction = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.params;

    try {
        const getTransaction = await prisma.transaction.findUnique({ where: { id: Number(transactionId) } });
        if (!getTransaction) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "transaction does not exist" });
        if (getTransaction.payment_type?.toLowerCase() === "paystack") {
            const { data } = await axios.get(`https://api.paystack.co/transaction/verify/${getTransaction.biller_Reference}`, { headers: { Authorization: `Bearer ${config.server.PAYSTACK_SECRET_KEY}` } });

            const response = data as paystackResponseVerification;
            if (response.data.status === "success") {
                try {
                    const updateTransaction = await prisma.transaction.update({ where: { id: Number(transactionId) }, data: { status: "successful" } });
                    const updateOrder = await prisma.orders.update({ where: { id: getTransaction.orderId }, data: { status: "successful" } });
                    Promise.all([updateTransaction, updateOrder]);
                    const details = {
                        name: updateOrder.name,
                        email: updateOrder.email,
                        amount: updateOrder.total_amount,
                        status: updateOrder.status,
                    };
                    try {
                        const checkProductDetails = await prisma.orderDetails.findMany({ where: { orderId: updateOrder.id } });
                        checkProductDetails.forEach(async (item) => {
                            const findProduct = await prisma.product.findUnique({ where: { id: item.productId } });
                            if (findProduct && item.quantity) await prisma.product.update({ where: { id: findProduct.id }, data: { quantity: { decrement: item.quantity } } });
                        });
                    } catch (error) {
                        logger.error(error);
                        return next({ message: "error processing your data at this time", error });
                    }
                    const sendMail = await sendEmail(
                        "emsthias33@gmail.com",
                        "Transaction Details",
                        `<html>
                        <body>
                            <p>name: ${details.name}</p>
                            <p>email: ${details.email}</p>
                            <p>Total Amount: ${details.amount}</p>
                            <p>Status: ${details.status}</p>
                        </body>
                    
                    </html>`,
                    );
                    return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ status: response.status, message: response.message, sendMail });
                } catch (error) {
                    logger.error(error);
                    return next({ message: "error processing your data at this time", error });
                }
            }

            const updateTransaction = await prisma.transaction.update({ where: { id: Number(transactionId) }, data: { status: "failed" } });

            const updateOrder = await prisma.orders.update({ where: { id: getTransaction.orderId }, data: { status: "failed" } });

            Promise.all([updateTransaction, updateOrder]);

            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ status: false, message: response.message });
        }
    } catch (error) {
        logger.error(error);
        return next({ message: "error processing your data at this time", error });
    }
};
