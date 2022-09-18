import config from "../config";

export const newPasswordUrlFormater = (token: string, urlType = "guest") => {
    if (urlType === "guest") return `${config.server.FRONTEND_GUEST_HOST}/createpassword/${token}`;
    return `${config.server.FRONTEND_ADMIN_HOST}/admin/createpassword/${token}`;
};
