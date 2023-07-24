import jwt from "jsonwebtoken";
import config from "../config.js";

export const sign = (payload: object) => {
    return jwt.sign(payload, config.api.jwtSecret, {
        expiresIn: config.api.tokenLifetime + 's'
    });
};

export const validate = (token: string) => new Promise<object | void>(resolve => {
    jwt.verify(token, config.api.jwtSecret, (err, payload) => {
        if(err) return resolve();
        resolve(payload as object);
    });
});
