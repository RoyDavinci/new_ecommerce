import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({ ...config.mail });

export const sendEmail = async (to: string, subject: string, body: string) =>
    new Promise((resolve, reject) => {
        const mailOptions = {
            from: config.mail.auth.user,
            to,
            subject,
            html: body,
        };
        try {
            transporter.sendMail(mailOptions);
            return resolve(true);
        } catch (error) {
            return reject(new Error("error processing data"));
        }
    });
