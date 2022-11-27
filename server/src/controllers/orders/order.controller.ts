import { Request, Response } from "express";
import { PrismaClient, orderDetails, orders } from "@prisma/client";
import HTTP_STATUS_CODE from "../../constant/httpCodes";
import { RedisClient } from "../../db/class";
import { logger } from "../../common/logger";
import { IUser } from "../auth/auth.interface";
import { v4 as uuid } from "uuid";
import { IProducts } from "../products/products.interfaces";
import { IGuest } from "../guests/geusts.interface";
import { IShipper } from "../shippers/shipper.interfaces";

const prisma = new PrismaClient();
// const redisInstance: RedisClient = new RedisClient();

export const createOrder = async (req: Request, res: Response) => {
    const { name, email, total_amount, payment_type, quantity, address, delivery_type, product_details, phone, shipperId } = req.body;

    try {
        const user = req.user as unknown as IUser;
        if (user) {
            let shipperInfo: IShipper | null;
            let shipperInfoId: number = 0;
            if (delivery_type !== "pickup") {
                shipperInfo = await prisma.shippers.findUnique({ where: { id: Number(shipperId) } });
                if (!shipperInfo) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "shipper does not exist" });
                shipperInfoId = Number(shipperId);
            }
            const createNewOrder = await prisma.orders.create({
                data: { name, email, total_amount, payment_type, quantity, delivery_type, phone: phone, product_detail: product_details, order_code: uuid(), address, status: "pending", userId: user.subscriberId },
            });
            if (createNewOrder?.product_detail && typeof createNewOrder?.product_detail === "object" && Array.isArray(createNewOrder?.product_detail)) {
                let createProductDetails = createNewOrder?.product_detail as unknown as IProducts[];
                createProductDetails.map(async (item) => {
                    const data = await prisma.product.findUnique({ where: { id: item.id } });
                    try {
                        if (data?.adminId) {
                            await prisma.orderDetails.create({
                                data: {
                                    orderId: createNewOrder?.id,
                                    address,
                                    email,
                                    productId: data?.id,
                                    shippersId: shipperInfoId > 0 ? shipperInfoId : null,
                                    phone: phone,
                                    adminId: data.adminId,
                                    amount: Number(item.price),
                                    quantity: item.quantity,
                                },
                            });
                        }
                        if (data?.sellerId) {
                            await prisma.orderDetails.create({
                                data: {
                                    orderId: createNewOrder?.id,
                                    address,
                                    email,
                                    productId: data?.id,
                                    shippersId: shipperInfoId > 0 ? shipperInfoId : null,
                                    phone: phone,
                                    merchantId: data.sellerId,
                                    amount: Number(item.price),
                                    quantity: item.quantity,
                                },
                            });
                        }
                    } catch (error) {
                        logger.error(error);
                        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
                    }
                });
            }
            return res.status(200).json({ message: "order created", createNewOrder });
        } else {
            let createGuest: IGuest;
            let id: number = 0;
            const findGuest = await prisma.guest.findUnique({ where: { email } });
            if (!findGuest) {
                createGuest = await prisma.guest.create({ data: { name, email, mobile: phone, address } });
                id = createGuest.id;
            } else {
                id = findGuest.id;
            }
            logger.info(id);
            const createNewOrder = await prisma.orders.create({
                data: { name, email, total_amount, payment_type, quantity: Number(quantity), delivery_type, phone: phone, product_detail: product_details, order_code: uuid(), address, status: "pending", guestId: id },
            });
            let shipperInfo: IShipper | null;
            let shipperInfoId: number = 0;
            if (delivery_type !== "pickup") {
                shipperInfo = await prisma.shippers.findUnique({ where: { id: Number(shipperId) } });
                if (!shipperInfo) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "shipper does not exist" });
                shipperInfoId = Number(shipperId);
            }
            if (createNewOrder?.product_detail && typeof createNewOrder?.product_detail === "object" && Array.isArray(createNewOrder?.product_detail)) {
                let createProductDetails = createNewOrder?.product_detail as unknown as IProducts[];
                createProductDetails.map(async (item) => {
                    const data = await prisma.product.findUnique({ where: { id: item.id } });
                    try {
                        if (data?.adminId) {
                            await prisma.orderDetails.create({
                                data: {
                                    orderId: createNewOrder?.id,
                                    address,
                                    email,
                                    productId: data?.id,
                                    shippersId: shipperInfoId > 0 ? shipperInfoId : null,
                                    phone: phone,
                                    adminId: data.adminId,
                                    amount: Number(item.price),
                                    quantity: Number(item.quantity),
                                },
                            });
                        }
                        if (data?.sellerId) {
                            await prisma.orderDetails.create({
                                data: {
                                    orderId: createNewOrder?.id,
                                    address,
                                    email,
                                    productId: data?.id,
                                    shippersId: shipperInfoId > 0 ? shipperInfoId : null,
                                    phone: phone,
                                    merchantId: data.sellerId,
                                    amount: Number(item.price),
                                    quantity: Number(item.quantity),
                                },
                            });
                        }
                    } catch (error) {
                        logger.error(error);
                        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
                    }
                });
            }
            return res.status(200).json({ message: "order created", createNewOrder });
        }
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};

export const getAllOrdersForAUser = async (req: Request, res: Response) => {
    try {
        const { adminId, subscriberId } = req.user as unknown as IUser;
        if (adminId) {
            const uniqueORderDetail: orderDetails[] = await prisma.orderDetails.findMany({ where: { adminId } });
            const finalOrder: orders[] = [];

            for (let index = 0; index < uniqueORderDetail.length; index++) {
                const data = await prisma.orders.findUnique({ where: { id: uniqueORderDetail[index].orderId } });

                data && finalOrder.push(data);
            }
            const orders = finalOrder.map((item, index) => {
                return { ...item, id: index + 1 };
            });
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "orders gotten", orders });
        }
        if (subscriberId) {
            const uniqueORderDetail: orderDetails[] = await prisma.orderDetails.findMany({ where: { adminId } });
            const finalOrder: orders[] = [];

            for (let index = 0; index < uniqueORderDetail.length; index++) {
                const data = await prisma.orders.findUnique({ where: { id: uniqueORderDetail[index].orderId } });

                data && finalOrder.push(data);
            }
            const orders = finalOrder.map((item, index) => {
                return { ...item, id: index + 1 };
            });
            return res.status(HTTP_STATUS_CODE.ACCEPTED).json({ message: "orders gotten", orders });
        }
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};

export const getSingleOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    // logger.info(JSON.stringify(id));
    try {
        const searchForOrder = await prisma.orders.findUnique({ where: { id: Number(id) } });
        return res.status(200).json({ message: "order gotten", searchForOrder });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, email, total_amount, payment_type, quantity, address, delivery_type, product_details, phone, shipperId } = req.body;
    try {
        let shipperInfo: IShipper | null;
        if (shipperId) {
            shipperInfo = await prisma.shippers.findUnique({ where: { id: Number(shipperId) } });
            if (!shipperInfo) return res.status(400).json({ message: "shipper does not exist" });
        }
        const updateOders = await prisma.orders.update({ where: { id: Number(id) }, data: { name, email, quantity: parseInt(quantity), total_amount, phone, delivery_type, address, payment_type, product_detail: product_details } });

        return res.status(200).json({ updateOders, message: "order updated" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};

export const getUpdate = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        logger.info(id);
        return res.status(200).json({ message: "huhb" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const user = req.user as unknown as IUser;
        if (!user) return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "cannot delete order" });
        const findOrder = await prisma.orders.findUnique({ where: { id: Number(id) } });
        if (!findOrder) return res.status(400).json({ message: `order with order id ${id} does not exist` });
        const findOrderDetails = await prisma.orderDetails.findMany({ where: { orderId: Number(id) } });
        Promise.all([
            await prisma.orders.delete({ where: { id: Number(id) } }),
            findOrderDetails.forEach(async (item) => {
                await prisma.orderDetails.delete({ where: { id: item.id } });
            }),
        ]);
        return res.status(400).json({ message: "order deleted" });
    } catch (error) {
        logger.error(error);
        return res.status(HTTP_STATUS_CODE.BAD_REQUEST).json({ message: "an error occured processing your request", error });
    }
};
