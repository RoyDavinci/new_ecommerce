import serverConfig from "./server";
import databaseConfig from "./database";
import redisConfig from "./redis";
import mailConfig from "./mail";
import cloudinaryConfig from "./cloudinary";
// import africaTalkingConfig from "./africatalking.config";

const config = { ...serverConfig, ...databaseConfig, ...redisConfig, ...mailConfig, ...cloudinaryConfig };
export default config;
