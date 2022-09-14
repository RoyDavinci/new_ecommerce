export interface IUser {
    first_name: string | null;
    password: string;
    last_name: string | null;
    email: string;
    id: number;
    voucher?: string;
    accountStatus: number;
}
