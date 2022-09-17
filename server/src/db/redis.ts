import { Client, Repository, EntityData } from "redis-om";
import config from "../config";
import { logger } from "../common/logger";
import { blacklistedUserSchema, prospectiveUserSchema, ForgetPasswordRequestSchema } from "./schemas";

async function connect() {
    const client = await new Client().open(config.redis.REDIS);
    const prospectiveUserRepository = client.fetchRepository(prospectiveUserSchema);
    const blacklistedUserRepository = client.fetchRepository(blacklistedUserSchema);
    const ForgetPasswordRequestRepository = client.fetchRepository(ForgetPasswordRequestSchema);
    try {
        if (!client.isOpen()) {
            await client.open(config.redis.REDIS);
        }
        logger.info("Connected to redis server");
        await prospectiveUserRepository.dropIndex();
        await prospectiveUserRepository.createIndex();
        await blacklistedUserRepository.dropIndex();
        await blacklistedUserRepository.createIndex();
        await ForgetPasswordRequestRepository.dropIndex();
        await ForgetPasswordRequestRepository.createIndex();
        return { prospectiveUserRepository, blacklistedUserRepository, ForgetPasswordRequestRepository, client };
    } catch (error) {
        logger.info("failed Connecting to redis server");
        throw new Error(error as unknown as string | undefined);
    }
}

export async function emailAlreadyExist(email: string) {
    const data = await connect();
    const checkEmail = await data.prospectiveUserRepository.search().where("email").equalTo(email).return.all();
    return checkEmail.length;
}
export async function createProspectiveUser(data: EntityData | undefined) {
    const datum = await connect();
    const prospectiveUser = await datum.prospectiveUserRepository.createAndSave(data);
    const id = await datum.prospectiveUserRepository.save(prospectiveUser);
    datum.client.execute(["EXPIRE", `ProspectiveUser:${id}`, config.server.OTP_TTL]);
    return id;
}

export async function removeForgetPasswordRequest(id: string) {
    const data = await connect();
    return data.ForgetPasswordRequestRepository.remove(id);
}

export async function fetchForgetPasswordRequest(id: string) {
    const data = await connect();
    const { entityId } = await data.ForgetPasswordRequestRepository.fetch(id);
    return entityId;
}

// blacklisted users logics and methods

export async function blacklistUser(data: { token: string | undefined; reason: string; createdAt: string } | undefined) {
    const item = await connect();
    const blacklistedUser = await item.blacklistedUserRepository.createAndSave(data as unknown as EntityData | undefined);
    const id = await item.blacklistedUserRepository.save(blacklistedUser);
    item.client.execute(["EXPIRE", `BlacklistedUser:${id}`, 7 * 24 * 60 * 60]);
}

export async function searchBlaclklistedUsers(token: string) {
    const item = await connect();
    const users = await item.blacklistedUserRepository.search().where("token").eq(token).return.all();
    return users;
}

export async function removeBlacklistedUser(id: string) {
    const item = await connect();
    return item.blacklistedUserRepository.remove(id);
}
export async function setAdmins(data: object[]) {
    const item = await connect();
    const rolesStrigified = JSON.stringify(data);
    item.client.execute(["SET", "admins", rolesStrigified]);
    item.client.execute(["EXPIRE", "admins", config.server.RESOURCE_KEY_EXPIRATION]);
}
export async function setSubscribers(data: object[]) {
    const item = await connect();
    const subscribersStrigified = JSON.stringify(data);
    item.client.execute(["SET", "subscribers", subscribersStrigified]);
    item.client.execute(["EXPIRE", "subscribers", config.server.RESOURCE_KEY_EXPIRATION]);
}

const connectRedisCache = async () => {
    try {
        const redisInstance = await connect();
        return redisInstance;
    } catch (error) {
        logger.error(`Error: connecting to redis cacheing server ${error}`);
        return process.exit(1);
    }
};

export default connectRedisCache;
