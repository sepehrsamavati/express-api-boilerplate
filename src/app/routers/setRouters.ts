import { Application, Router } from "express";

export default function setRouters(app: Application) {
    const apiRouter = Router();
    app.use('/api', apiRouter);
}

