import express from "express";
import logger from "./common/logger.js";
import compress from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || "5000";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());
app.listen(PORT, () => {
    logger.info(`App listening in on http://localhost:${PORT}`);
});
