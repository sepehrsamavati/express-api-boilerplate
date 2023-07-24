import cookieParser from "cookie-parser";
import LoginDTO from "../dto/LoginDTO.js";
import { Application, Router } from "express";
import productRouter from "./product.router.js";
import { loginHandler } from "../handlers/login.js";
import { authGuard } from "../middlewares/authGuard.js";
import { jwtResolve } from "../middlewares/jwtResolve.js";
import { validator } from "../middlewares/dtoValidator.js";

export default function setRouters(app: Application) {
    const apiRouter = Router();

    apiRouter.use(cookieParser(), jwtResolve, authGuard);

    apiRouter.use("/product", productRouter);
    
    app.post("/api/login", validator(LoginDTO), loginHandler);
    app.use('/api', apiRouter);
}
