import serverConfig from "./server";
import databaseConfig from "./database";
import redisConfig from "./redis";
import mailConfig from "./mail";
// import africaTalkingConfig from "./africatalking.config";

const config = { ...serverConfig, ...databaseConfig, ...redisConfig, ...mailConfig };
export default config;
