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
import dotenv from "dotenv";
import apiv1router from "./routes/routes";
import passport from "passport";
const app: Express = express();

dotenv.config();

const PORT: string = process.env.PORT || "5000";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.use(sessionInstance);
passportService(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", apiv1router);

app.use(serviceNotFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
    logger.info(`App listening in on http://localhost:${PORT}`);
});
