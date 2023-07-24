import config from "../../config.js";
import { RequestHandler } from "express";
import { validate } from "../../helpers/jwtHelper.js";

export const jwtResolve: RequestHandler = async (req, res, next) => {
    const token = req.cookies ? req.cookies[config.api.accessTokenKey] : undefined;
    if(typeof token === "string") {
        const payload = await validate(token);
        if(payload) {
            res.locals.user = payload;
        }
    }
    next();
};
