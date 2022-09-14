import { PassportStatic } from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";
import config from "../config";
import { IUser } from "../controllers/user/user.interface";

const prisma = new PrismaClient();

const jwtOptions = {
    jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.server?.secret,
};

async function passportService(passport: PassportStatic) {
    passport.use(
        new passportJWT.Strategy(jwtOptions, async (jwtPayload, done) => {
            try {
                const user: IUser | null = await prisma.users.findUnique({ where: { id: Number(jwtPayload.id) } });
                if (!user) {
                    return done(null, user, { message: "authentication not approved" });
                }
                if (user.accountStatus === config.server.DELETE_ACCOUNT_CODE) return done(null, false, { message: "not a registered account" });
                if (user.accountStatus === config.server.BLOCK_ACCOUNT_CODE) return done(null, false, { message: "blocked: contact admin" });
                return done(null, user, { message: "authenticated successfullly" });
            } catch (error) {
                return done(error, false, { message: "Error processing your info" });
            }
        }),
    );

    passport.use(
        new passportLocal.Strategy(
            {
                usernameField: config.databaseConfig.MODEL_EMAIL_FIELD,
                passwordField: config.databaseConfig.MODEL_PASSWORD_FIELD,
            },
            async (username, password, done) => {
                try {
                    const user: IUser | null = await prisma.users.findUnique({ where: { email: username } });
                    if (!user) {
                        return done(null, false, { message: `${username} is not a registered account` });
                    }
                    const isMatch: boolean = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        if (user.accountStatus === config.server.DELETE_ACCOUNT_CODE) return done(null, false, { message: "not a registered account" });
                        if (user.accountStatus === config.server.BLOCK_ACCOUNT_CODE) return done(null, false, { message: "blocked: contact admin" });
                        return done(null, user, { message: "authenticated successfullly" });
                    }
                    return done(null, false, { message: "Wrong Username/Password" });
                } catch (error) {
                    return done(error, false, { message: "Error processing your info" });
                }
            },
        ),
    );

    passport.serializeUser((user, done) => {
        const { id } = user as unknown as IUser;
        done(null, id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.users.findUnique({ where: { id: Number(id) } });
            return done(null, user);
        } catch (error) {
            return done(error, false);
        }
    });
}

export default passportService;
