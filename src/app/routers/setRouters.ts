import LoginDTO from "../dto/LoginDTO.js";
import { Application, Router } from "express";
import { loginHandler } from "../handlers/api/login.js";
import { validator } from "../middlewares/dtoValidator.js";

export default function setRouters(app: Application) {
    const apiRouter = Router();

    apiRouter.post("/login", validator(LoginDTO), loginHandler);

    app.use('/api', apiRouter);
}
