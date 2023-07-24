import "reflect-metadata";
import * as dotenv from "dotenv";
import process from "node:process";
import ConfigError from "./models/ConfigError.js";
dotenv.config();

const config = Object.freeze({
    debug: false,
    alwaysConsoleLog: false,
    isDevelopment: process.env.NODE_ENV !== "production",
    api: {
        port: parseInt(process.env?.EAB_SERVER_PORT ?? "3033"),
        trustProxy: process.env?.EAB_TRUST_PROXY?.trim().toLowerCase() === "true",
        accessTokenKey: process.env.EAB_API_ACCESS_TOKEN_KEY ?? "AccessToken",
        jwtSecret: process.env.EAB_API_JWT_SECRET ?? "",
        tokenLifetime: parseInt(process.env.EAB_TOKEN_LIFETIME ?? "3600")

    },
    log: {
        disable: process.argv.includes("--silent-logger"),
        maxLogSize: 10 * 1024 * 1024,
        maxLogFiles: 10
    }
});

if(config.api.jwtSecret.length === 0) new ConfigError("Define a secret for JWT in '.env'");

export default config;
