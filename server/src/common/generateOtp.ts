import moment from "moment";
import Generator from "otp-generator";
import config from "../config";

export const generateOTP = async (): Promise<{ otp: string; createdAt: string; ttl: string }> =>
    new Promise((resolve) => {
        resolve({
            otp: Generator.generate(config.server.OTP_LENGTH, {
                digits: true,
                lowerCaseAlphabets: false,
                upperCaseAlphabets: false,
                specialChars: false,
            }),
            ttl: config.server.OTP_TTL,
            createdAt: moment.utc().format(),
        });
    });
