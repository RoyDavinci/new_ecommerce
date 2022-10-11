import { UploadApiResponse, UploadStream, v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { Request } from "express";
import { logger } from "../common/logger";

export const streamUpload = (req: Request) => {
    logger.info("gotten to stream upload");
    return new Promise((resolve, reject) => {
        let stream: UploadStream = cloudinary.uploader.upload_stream({ timeout: 60000 }, (error, result) => {
            if (result) {
                resolve(result);
            } else {
                reject(error);
            }
        });
        if (!req.file?.buffer) return { message: "please pass a file" };
        streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
};
