import { RequestHandler } from "express";
import { httpServerLogger } from "../../helpers/logger.js";

export const httpLogger: RequestHandler = (req, res, next) => {
    const { ip, method, path } = req;
    const userAgent = req.headers?.["user-agent"];
    const startTime = performance.now();
    res.once("finish", () => {
        httpServerLogger.info(`${res.statusCode} ${ip} ${Math.round(performance.now() - startTime)}ms ${path} ${method} ${userAgent}`);
    });
    next();
};

