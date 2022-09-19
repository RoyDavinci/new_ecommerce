import { PrismaClient } from "@prisma/client";
import { generateHash } from "../common/generateHash";
import config from "../config";
import { logger } from "../common/logger";
import { sendEmail } from "../common/sendMail";
import { adminNewPasswordHTML } from "../common/adminNewPasswordHtml";
import { newPasswordUrlFormater } from "../common/newPasswordUrlFormater";
import { generateToken } from "../common/generateToken";

const prisma = new PrismaClient();
export const createSuperUser = async () => {
    try {
        const checkAdmin = await prisma.users.findFirst({ where: { email: config.server.SUPER_ADMIN_EMAIL, role: config.server.SUPER_ADMIN_ROLE } });

        if (checkAdmin === null) {
            const hashedPasssword = await generateHash(config.server.SUPER_ADMIN_PASSWORD);

            const newAdmin = await prisma.admin.create({ data: { email: config.server.SUPER_ADMIN_EMAIL, name: `${config.server.SUPER_ADMIN_FIRSTNAME} ${config.server.SUPER_ADMIN_LASTNAME}`, role: config.server.SUPER_ADMIN_ROLE } });

            await prisma.users.create({
                data: { first_name: config.server.SUPER_ADMIN_FIRSTNAME, last_name: config.server.SUPER_ADMIN_LASTNAME, password: hashedPasssword, role: config.server.SUPER_ADMIN_ROLE, email: config.server.SUPER_ADMIN_EMAIL, adminId: newAdmin.id },
            });
            const token = generateToken({ id: newAdmin.id, email: config.server.SUPER_ADMIN_EMAIL, role: config.server.SUPER_ADMIN_ROLE }, config.server.FORGET_PASSWORD_TOKEN_EXPIRATION);
            logger.info("superadmin created successfully at bootup");
            await sendEmail(config.server.SUPER_ADMIN_EMAIL, config.server.NEW_PASSWORD_EMAIL_HEADER, adminNewPasswordHTML(newPasswordUrlFormater(token, "admin")));
        }
    } catch (error) {
        logger.error(`creating superAdmin ${error}`);
        process.exit(1);
    }
};
