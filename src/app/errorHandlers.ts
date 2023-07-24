import { httpServerLogger } from "../helpers/logger.js";
import { RequestHandler, ErrorRequestHandler } from "express";

export const notFoundHandler: RequestHandler = function(req, res, next) {
    res.status(404);

    if (req.accepts('json')) {
        res.json({ message: 'Not found', errorCode: 404 });
        return;
    }

    res.type('txt').send('Not found');
};

export const errorRequestHandler: ErrorRequestHandler = function(err, req, res, next) {
    const errorCode = err.status || 500;
    res.status(errorCode);
    res.json({
        message: err.message,
        errorCode
    });
    httpServerLogger.error("Express error request handler, " + (err.message ?? err));
};
