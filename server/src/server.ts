import express, { Express } from "express";
import { logger } from "./common/logger";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./common/errorRequestHandler";
import serviceNotFoundHandler from "./common/serviceNotFoundHandler";
import sessionInstance from "./common/session";
import passportService from "./common/passportService";
import rateLimiter from "./common/rateLimiter";
import dotenv from "dotenv";
import apiv1router from "./routes/routes";
import passport from "passport";
import config from "./config";
import http from "http";
import debug from "debug";
import { healthRouter } from "./controllers";
import connectRedisCache from "./db/redis";
import { createSuperUser } from "./serverSetup";
import { v2 as cloudinary } from "cloudinary";

const app: Express = express();

dotenv.config();
const serverDebugger = debug("jekawin:server");

const port = normalizePort(config.server.port || "8080");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

cloudinary.config({
    cloud_name: config.cloudinaryConfig.CLOUDINARY_NAME,
    api_key: config.cloudinaryConfig.CLOUDINARY_API_KEY,
    api_secret: config.cloudinaryConfig.CLOUDNIARY_API_SECRET,
});

app.use(sessionInstance);
connectRedisCache();
createSuperUser();
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", healthRouter);
app.use("/api/v1", apiv1router);

app.use(serviceNotFoundHandler);
app.use(errorHandler);
app.use(rateLimiter);

const server: http.Server = http.createServer(app);

process.on("unhandledRejection", (reason, p) => logger.error("Unhandled Rejection at: Promise ", p, reason));

server.listen(port, () => {
    if (config.isDevelopment) logger.info(`server port: http://localhost:${port}`);
});

server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string) {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}

function onError(error: { syscall: string; code: string }) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        case "ELIFECYCLE":
            logger.error(`${bind}this happened instaed`);
            process.exit(1);
            break;
        default:
            logger.info("this happened instead");
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr?.port}`;
    serverDebugger(`Listening on ${bind}`);
}
