import { Decimal } from "@prisma/client/runtime";

export interface IProducts {
    id: number;
    sellerId?: number | null;
    adminId?: number | null;
    images?: string[];
    description: string | null;
    name: string | null;
    price: Decimal;
    categoryId: number;
    quantity: number;
    year: string;
    make: string;
    model: string;
}
