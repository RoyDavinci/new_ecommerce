import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { logger } from "../../common/logger";
import { IUser } from "../auth/auth.interface";
import { v4 as uuid } from "uuid";
import { IProducts } from "../products/products.interfaces";
import { IGuest } from "../guests/geusts.interface";
import { IShipper } from "../shippers/shipper.interfaces";

const prisma = new PrismaClient();
const redisInstance: RedisClient = new RedisClient();

export const createOrder = async (req: Request, res: Response) => {
    const { name, email, total_amount, payment_type, quantity, address, delivery_type, product_details, mobile, shipperId } = req.body;
    try {
        const user = req.user as unknown as IUser;
        if (user) {
            const createOrder = await prisma.orders.create({
                data: { name, email, total_amount, payment_type, quantity, delivery_type, phone: mobile, product_detail: product_details, order_code: uuid(), address, status: "pending", userId: user.subscriberId },
            });
            let shipperInfo: IShipper | null;
            let shipperInfoId: number = 0;
            if (delivery_type !== "pickup") {
                shipperInfo = await prisma.shippers.findUnique({ where: { id: Number(shipperId) } });
                if (!shipperInfo) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "shipper does not exist" });
                shipperInfoId = Number(shipperId);
            }
            if (createOrder?.product_detail && typeof createOrder?.product_detail === "object" && Array.isArray(createOrder?.product_detail)) {
                let createProductDetails = createOrder?.product_detail as unknown as IProducts[];
                createProductDetails.map(async (item) => {
                    const data = await prisma.product.findUnique({ where: { id: item.id } });
                    try {
                        if (data?.adminId) {
                            await prisma.orderDetails.create({ data: { orderId: createOrder?.id, address, email, productId: data?.id, shippersId: shipperInfoId > 0 ? shipperInfoId : null, phone: mobile, adminId: data.adminId } });
                        }
                        if (data?.sellerId) {
                            await prisma.orderDetails.create({ data: { orderId: createOrder?.id, address, email, productId: data?.id, shippersId: shipperInfoId > 0 ? shipperInfoId : null, phone: mobile, merchantId: data.sellerId } });
                        }
                    } catch (error) {
                        logger.error(error);
                        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
                    }
                });
            }
            return res.status(200).json({ message: "order created", createOrder });
        } else {
            let createGuest: IGuest;
            let id: number = 0;
            const findGuest = await prisma.guest.findUnique({ where: { email } });
            if (!findGuest) {
                createGuest = await prisma.guest.create({ data: { name, email, mobile, address } });
                id = createGuest.id;
            } else {
                id = findGuest.id;
            }
            logger.info(id);
            const createOrder = await prisma.orders.create({
                data: { name, email, total_amount, payment_type, quantity: Number(quantity), delivery_type, phone: mobile, product_detail: product_details, order_code: uuid(), address, status: "pending", guestId: id },
            });
            let shipperInfo: IShipper | null;
            let shipperInfoId: number = 0;
            if (delivery_type !== "pickup") {
                shipperInfo = await prisma.shippers.findUnique({ where: { id: Number(shipperId) } });
                if (!shipperInfo) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "shipper does not exist" });
                shipperInfoId = Number(shipperId);
            }
            if (createOrder?.product_detail && typeof createOrder?.product_detail === "object" && Array.isArray(createOrder?.product_detail)) {
                let createProductDetails = createOrder?.product_detail as unknown as IProducts[];
                createProductDetails.map(async (item) => {
                    const data = await prisma.product.findUnique({ where: { id: item.id } });
                    try {
                        if (data?.adminId) {
                            await prisma.orderDetails.create({ data: { orderId: createOrder?.id, address, email, productId: data?.id, shippersId: shipperInfoId > 0 ? shipperInfoId : null, phone: mobile, adminId: data.adminId } });
                        }
                        if (data?.sellerId) {
                            await prisma.orderDetails.create({ data: { orderId: createOrder?.id, address, email, productId: data?.id, shippersId: shipperInfoId > 0 ? shipperInfoId : null, phone: mobile, merchantId: data.sellerId } });
                        }
                    } catch (error) {
                        logger.error(error);
                        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
                    }
                });
            }
            return res.status(200).json({ message: "order created", createOrder });
        }
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};
