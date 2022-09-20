export interface IUser {
    password: string;
    email: string;
    id: number;
    accountStatus: number;
    adminId: number | null;
    subscriberId: number | null;
    sellerId: null | null;
    role: string | null;
}
export interface IAdmin {
    id: number;
    email: string;
    voucher: string | null;
    username: string | null;
    phone: string | null;
    address: string | null;
}
