import config from "../../config.js";
import { RequestHandler } from "express";
import LoginDTO from "../dto/LoginDTO.js";
import { sign } from "../../helpers/jwtHelper.js";
import { hash, hashCompare } from "../../helpers/crypto.js";
import OperationResult from "../../models/OperationResult.js";

export const loginHandler: RequestHandler = async (req, res, next) => {
    const loginDTO: LoginDTO = req.body;
    const operationResult = new OperationResult();

    // CHANGE HERE (read from database...)
    // > start
    const user = loginDTO.username.toLocaleLowerCase() === "admin"
        ? {
            username: "admin",
            password: hash("admin")
        } : null;
    // > end

    if (!user)
        return res.json(operationResult.failed());

    if (!hashCompare(loginDTO.password, user.password))
        return res.json(operationResult.failed());
    else {
        const userPayload = {
            username: user.username
        };
        const token = sign(userPayload);
        res.clearCookie(config.api.accessTokenKey);
        res.cookie(config.api.accessTokenKey, token, {
            maxAge: config.api.tokenLifetime * 1e3
        });
        return res.json(operationResult.succeeded(token));
    }
};
