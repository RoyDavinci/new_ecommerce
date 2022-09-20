import { Request, Response } from "express";
import moment from "moment";
import CryptoJS from "crypto-js";
import axios from "axios";

export const checkHealth = async (req: Request, res: Response) => {
    return res.status(200).json({ message: "ecommerce is alive" });
};

export const testing = async (req: Request, res: Response) => {
    const auth = getAuthHeader("POST", "https://api.staging.baxibap.com/rest/consumer/v2/exchange/proxy", req.body);

    res.status(200).json({ auth });
};

export function getAuthHeader(httpMethod: string, requestUrl: string, requestBody: string | object[]) {
    var CLIENT_KEY = "baxi_capricorn";
    var SECRET_KEY = "usertest1a";

    var requestPath = requestUrl;
    if (httpMethod == "GET") {
        requestBody = "";
    } else {
        requestBody = JSON.stringify(requestBody);
    }

    if (requestBody) {
        var hashedPayload = CryptoJS.SHA256(requestBody).toString(CryptoJS.enc.Base64);
    } else {
        var hashedPayload = "";
    }

    var currentTime = new Date().toUTCString();

    var timestamp = moment(currentTime).unix();
    var requestData = httpMethod + requestPath + timestamp + hashedPayload;

    var hmacDigest = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA1, SECRET_KEY);
    hmacDigest.update(requestData);

    var authHeader = "Baxi" + " " + CLIENT_KEY + ":" + hmacDigest.finalize().toString(CryptoJS.enc.Base64);

    console.log(requestBody);

    console.log(CryptoJS.SHA256(requestBody).toString(CryptoJS.enc.Base64));

    return { authHeader, timestamp };
}
