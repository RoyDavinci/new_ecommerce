import { Entity, Schema } from "redis-om";

export class ProspectiveUser extends Entity {}

export const prospectiveUserSchema = new Schema(
    ProspectiveUser,
    {
        firstname: { type: "string" },
        lastname: { type: "string" },
        mobile: { type: "string" },
        password: { type: "string" },
        otp: { type: "string" },
        createdAt: { type: "string" },
    },
    {
        dataStructure: "JSON",
    },
);

export class BlacklistedUser extends Entity {}

export const blacklistedUserSchema = new Schema(
    BlacklistedUser,
    {
        token: { type: "string" },
        reason: { type: "string" },
        createdAt: { type: "string" },
    },
    {
        dataStructure: "JSON",
    },
);

export class ForgetPasswordRequest extends Entity {}

export const ForgetPasswordRequestSchema = new Schema(
    ForgetPasswordRequest,
    {
        userId: { type: "string" },
        otp: { type: "string" },
        createdAt: { type: "string" },
    },
    {
        dataStructure: "JSON",
    },
);
