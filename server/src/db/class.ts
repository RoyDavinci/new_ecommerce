import { Client, EntityData, Entity } from "redis-om";
import config from "../config";
import { logger } from "../common/logger";
import { blacklistedUserSchema, prospectiveUserSchema, ForgetPasswordRequestSchema } from "./schemas";

export class RedisClient {
    private client = new Client().open(config.redis.REDIS);

    private prospectiveUserRepository = this.client.then((data) => data.fetchRepository(prospectiveUserSchema));
    private blacklistedUserRepository = this.client.then((data) => data.fetchRepository(blacklistedUserSchema));
    private ForgetPasswordRequestRepository = this.client.then((data) => data.fetchRepository(ForgetPasswordRequestSchema));

    async connect() {
        try {
            if (!(await this.client).isOpen()) {
                (await this.client).open(config.redis.REDIS);
            }
            logger.info("Connected to redis server");
            Promise.all([
                (await this.prospectiveUserRepository).dropIndex(),
                (await this.prospectiveUserRepository).createIndex(),
                (await this.blacklistedUserRepository).dropIndex(),
                (await this.blacklistedUserRepository).createIndex(),
                (await this.ForgetPasswordRequestRepository).dropIndex(),
                (await this.ForgetPasswordRequestRepository).createIndex(),
            ]);
        } catch (error) {
            logger.info("failed Connecting to redis server");
            throw new Error(error as unknown as string | undefined);
        }
    }

    async emailAlreadyExist(email: string) {
        const checkEmail = (await this.prospectiveUserRepository).search().where("email").equalTo(email).return.all();
        return (await checkEmail).length;
    }

    async createProspectiveUser(data: EntityData | undefined) {
        const prospectiveUser = await (await this.prospectiveUserRepository).createAndSave(data);
        const id = await (await this.prospectiveUserRepository).save(prospectiveUser);
        (await this.client).execute(["EXPIRE", `ProspectiveUser:${id}`, config.server.OTP_TTL]);
        return id;
    }

    async fetchProspectiveUser(id: string) {
        const entity = await (await this.prospectiveUserRepository).fetch(id);
        return entity;
    }

    async createForgetPasswordRequest(data: EntityData | undefined) {
        const forgetPasswordRequest = (await this.ForgetPasswordRequestRepository).createEntity(data);
        const id = await (await this.ForgetPasswordRequestRepository).save(forgetPasswordRequest);
        (await this.client).execute(["EXPIRE", `ForgetPasswordRequest:${id}`, config.server.OTP_TTL]);
        return id;
    }

    async removeForgetPasswordRequest(id: string) {
        return (await this.ForgetPasswordRequestRepository).remove(id);
    }

    async fetchForgetPasswordRequest(id: string) {
        const entity = await (await this.ForgetPasswordRequestRepository).fetch(id);
        return entity;
    }

    // blacklisted users logics and methods

    async blacklistUser(data: { token: string | undefined; reason: string; createdAt: string } | undefined) {
        const blacklistedUser = await (await this.blacklistedUserRepository).createAndSave(data as unknown as EntityData | undefined);
        const id = await (await this.blacklistedUserRepository).save(blacklistedUser);
        (await this.client).execute(["EXPIRE", `BlacklistedUser:${id}`, 7 * 24 * 60 * 60]);
    }

    async searchBlaclklistedUsers(token: string) {
        const users = await (await this.blacklistedUserRepository).search().where("token").eq(token).return.all();
        return users;
    }

    async removeBlacklistedUser(id: string) {
        return (await this.blacklistedUserRepository).remove(id);
    }
    async setAdmins(data: object[]) {
        const rolesStrigified = JSON.stringify(data);
        (await this.client).execute(["SET", "admins", rolesStrigified]);
        (await this.client).execute(["EXPIRE", "admins", config.server.RESOURCE_KEY_EXPIRATION]);
    }

    async getAdmins() {
        const rolesStrigified = await (await this.client).execute(["GET", "admins"]);
        const datum = JSON.stringify(rolesStrigified);
        const data = JSON.parse(datum);
        return data;
    }

    async setSubscribers(data: object[]) {
        const subscribersStrigified = JSON.stringify(data);
        (await this.client).execute(["SET", "subscribers", subscribersStrigified]);
        (await this.client).execute(["EXPIRE", "subscribers", config.server.RESOURCE_KEY_EXPIRATION]);
    }
    async getSubscribers() {
        const rolesStrigified = await (await this.client).execute(["GET", "subscribers"]);
        const datum = JSON.stringify(rolesStrigified);
        const data = JSON.parse(datum);
        return data;
    }
}

const RedisCloudInstance = (() => {
    let instance: RedisClient;

    const createRedisInstance = async () => {
        const instance = new RedisClient();
        await instance.connect();
        return instance;
    };

    const getRedisInstance = async () => {
        if (!instance) {
            instance = await createRedisInstance();
            return instance;
        }
        return instance;
    };
    return { getRedisInstance };
})();

const connectRedisCache = async () => {
    try {
        const redisInstance = await RedisCloudInstance.getRedisInstance();
        return redisInstance;
    } catch (error) {
        logger.error(`Error: connecting to redis cacheing server ${error}`);
        return process.exit(1);
    }
};

export default connectRedisCache;
