import "reflect-metadata";
import * as dotenv from "dotenv";
import fs from "node:fs/promises";
import process from "node:process";
import ConfigError from "./models/ConfigError.js";
dotenv.config();

let version = process.env.npm_package_version;
if(!version) {
    try {
        version = JSON.parse((await fs.readFile("./package.json")).toString()).version;
    } catch {
        version = "unknown version";
    }
}

const config = Object.freeze({
    version,
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
