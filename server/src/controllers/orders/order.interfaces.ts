import { Prisma } from "@prisma/client";

export interface IOrders {
    id: number;
    order_code: string;
    product_detail: Prisma.JsonValue;
    name: string;
    email: string;
    phone: string;
    total_amount: string;
    userId: number | null;
    guestId: number | null;
    status: string;
    payment_type: string;
    quantity: number;
    address: string;
    delivery_type: string;
}
