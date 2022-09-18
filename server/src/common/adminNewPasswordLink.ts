import config from "../config";

export const admiNewPasswordLink = (token: string, validity: string) => {
    if (validity) return `${config.server.FRONTEND_ADMIN_HOST}/admin/createpassword?token=${token}&validity=${validity}`;
    return `${config.server.FRONTEND_ADMIN_HOST}/admin/createpassword?token=${token}`;
};
