import { Client, EntityData, Entity } from "redis-om";
import config from "../config";
import { logger } from "../common/logger";
import { blacklistedUserSchema, prospectiveUserSchema, ForgetPasswordRequestSchema, shipperInfoSchema } from "./schemas";

export class RedisClient {
    private client = new Client().open(config.redis.REDIS);

    private prospectiveUserRepository = this.client.then((data) => data.fetchRepository(prospectiveUserSchema));
    private blacklistedUserRepository = this.client.then((data) => data.fetchRepository(blacklistedUserSchema));
    private ForgetPasswordRequestRepository = this.client.then((data) => data.fetchRepository(ForgetPasswordRequestSchema));
    private ShipperInfoRepository = this.client.then((data) => data.fetchRepository(shipperInfoSchema));

    async connect() {
        try {
            if (!(await this.client).isOpen()) {
                (await this.client).open(config.redis.REDIS);
            }
            logger.info("Connected to redis server");
            await Promise.all([(await this.prospectiveUserRepository).createIndex(), (await this.blacklistedUserRepository).createIndex(), (await this.ForgetPasswordRequestRepository).createIndex(), (await this.ShipperInfoRepository).createIndex()]);
        } catch (error) {
            logger.info("failed Connecting to redis server");
            throw new Error(error as unknown as string | undefined);
        }
    }

    async emailAlreadyExist(email: string) {
        try {
            const checkEmail = (await this.prospectiveUserRepository).search().where("email").equalTo(email).return.all();
            return (await checkEmail).length;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async createProspectiveUser(data: EntityData | undefined) {
        try {
            const prospectiveUser = await (await this.prospectiveUserRepository).createAndSave(data);
            const id = await (await this.prospectiveUserRepository).save(prospectiveUser);
            (await this.client).execute(["EXPIRE", `ProspectiveUser:${id}`, config.server.OTP_TTL]);
            return id;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async fetchProspectiveUser(id: string) {
        try {
            const entity = await (await this.prospectiveUserRepository).fetch(id);
            return entity;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async createForgetPasswordRequest(data: EntityData | undefined) {
        try {
            const forgetPasswordRequest = (await this.ForgetPasswordRequestRepository).createEntity(data);
            const id = await (await this.ForgetPasswordRequestRepository).save(forgetPasswordRequest);
            (await this.client).execute(["EXPIRE", `ForgetPasswordRequest:${id}`, config.server.OTP_TTL]);
            return id;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async removeForgetPasswordRequest(id: string) {
        return (await this.ForgetPasswordRequestRepository).remove(id);
    }

    async fetchForgetPasswordRequest(id: string) {
        try {
            const entity = await (await this.ForgetPasswordRequestRepository).fetch(id);
            return entity;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    // blacklisted users logics and methods

    async blacklistUser(data: { token: string | undefined; reason: string; createdAt: string } | undefined) {
        try {
            const blacklistedUser = await (await this.blacklistedUserRepository).createAndSave(data as unknown as EntityData | undefined);
            const id = await (await this.blacklistedUserRepository).save(blacklistedUser);
            (await this.client).execute(["EXPIRE", `BlacklistedUser:${id}`, 7 * 24 * 60 * 60]);
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async searchBlaclklistedUsers(token: string) {
        try {
            const users = await (await this.blacklistedUserRepository).search().where("token").eq(token).return.all();
            return users;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async removeBlacklistedUser(id: string) {
        return (await this.blacklistedUserRepository).remove(id);
    }
    async setAdmins(data: object[]) {
        try {
            const rolesStrigified = JSON.stringify(data);
            (await this.client).execute(["SET", "admins", rolesStrigified]);
            (await this.client).execute(["EXPIRE", "admins", config.server.RESOURCE_KEY_EXPIRATION]);
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async getAdmins() {
        try {
            const rolesStrigified = await (await this.client).execute(["GET", "admins"]);
            const datum = JSON.stringify(rolesStrigified);
            const data = JSON.parse(datum);
            return data;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async setSubscribers(data: object[]) {
        try {
            const subscribersStrigified = JSON.stringify(data);
            (await this.client).execute(["SET", "subscribers", subscribersStrigified]);
            (await this.client).execute(["EXPIRE", "subscribers", config.server.RESOURCE_KEY_EXPIRATION]);
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }
    async getSubscribers() {
        try {
            const rolesStrigified = await (await this.client).execute(["GET", "subscribers"]);
            const datum = JSON.stringify(rolesStrigified);
            const data = JSON.parse(datum);
            return data;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async createProspectiveShipper(data: EntityData | undefined) {
        try {
            const prospectiveShipper = await (await this.ShipperInfoRepository).createAndSave(data);
            const id = await (await this.ShipperInfoRepository).save(prospectiveShipper);
            return id;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async fetchProspectiveShipper() {
        try {
            const entity = await (await this.ShipperInfoRepository).search().return.all();
            return entity;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }

    async searchLagosShippers(data: boolean) {
        try {
            const checkLagos = (await this.ShipperInfoRepository).search().where("lagos").equalTo(data).return.all();
            return (await checkLagos).length;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
    }
    async searchShipperInfo(data: string) {
        try {
            const checkPrice = (await this.ShipperInfoRepository).search().where("name").equalTo(data).return.all();
            return (await checkPrice).length;
        } catch (error) {
            throw new Error(error as unknown as string | undefined);
        }
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
