import { Entity, Schema } from "redis-om";

export class ProspectiveUser extends Entity {
    [x: string]: any;
}

export const prospectiveUserSchema = new Schema(
    ProspectiveUser,
    {
        first_name: { type: "string" },
        last_name: { type: "string" },
        username: { type: "string" },
        phone: { type: "string" },
        password: { type: "string" },
        email: { type: "string" },
        ttl: { type: "number" },
        otp: { type: "string" },
        createdAt: { type: "string" },
        address: { type: "string" },
    },
    {
        dataStructure: "JSON",
    },
);

export class BlacklistedUser extends Entity {
    [x: string]: any;
}

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

export class ForgetPasswordRequest extends Entity {
    [x: string]: any;
}

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
