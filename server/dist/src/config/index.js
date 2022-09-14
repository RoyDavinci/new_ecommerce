import serverConfig from "./server";
import databaseConfig from "./database";
import redisConfig from "./redis";
import mailConfig from "./mail";
const config = { ...serverConfig, ...databaseConfig, ...redisConfig, ...mailConfig };
export default config;
