export interface IUser {
    password: string;
    email: string;
    id: number;
    accountStatus: number;
    adminId: number | null;
    subscriberId: number | null;
    prospectId: string;
    otp: number;
}

export interface ISubscriber {
    id: number;
    email: string;
    voucher: string;
    username: string;
    phone: string;
    address: string;
}
export interface IAdmin {
    name: number;
    email: string;
}
