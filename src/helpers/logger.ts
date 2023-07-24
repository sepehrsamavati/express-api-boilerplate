import winston from "winston";
import config from "../config.js";

const commonConfig: Partial<winston.transports.FileTransportOptions> = {
    maxsize: config.log.maxLogSize,
    maxFiles: config.log.maxLogFiles
}, format = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.json()
);

export const httpServerLogger = winston.createLogger({
    format,
    transports: [
        new winston.transports.File({ ...commonConfig, filename: './logs/http-server.log', level: 'info' })
    ],
});

const debugLog = config.isDevelopment || config.debug;
if (!config.log.disable && (debugLog || config.alwaysConsoleLog)) {
    if (debugLog)
        httpServerLogger.add(new winston.transports.File({ ...commonConfig, filename: './logs/debug.log', level: 'silly' }));

    httpServerLogger.add(new winston.transports.Console({
        level: "silly",
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    })
    );
} else if (config.log.disable) {
    httpServerLogger.silent = true;
}
