import process from "node:process";
import * as dotenv from "dotenv";
dotenv.config();

const config = Object.freeze({
    debug: false,
    alwaysConsoleLog: false,
    isDevelopment: process.env.NODE_ENV !== "production",
    api: {
        port: parseInt(process.env.EAB_SERVER_PORT ?? "3033")
    },
    log: {
        disable: process.argv.includes("--silent-logger"),
        maxLogSize: 10 * 1024 * 1024,
        maxLogFiles: 10
    }
});

export default config;
