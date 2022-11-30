import serverConfig from "./server";
import databaseConfig from "./database";
import redisConfig from "./redis";
import mailConfig from "./mail";
import cloudinaryConfig from "./cloudinary";
import paymentConfig from "./payment";
// import africaTalkingConfig from "./africatalking.config";

const config = { ...serverConfig, ...databaseConfig, ...redisConfig, ...mailConfig, ...cloudinaryConfig, ...paymentConfig };
export default config;
