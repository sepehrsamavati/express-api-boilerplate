import { RequestHandler } from "express";

export const authGuard: RequestHandler = async (req, res, next) => {
    const user = res.locals.user;
    if(user) {
        next();
        return;
    }
    res.status(401).send(null);
};
