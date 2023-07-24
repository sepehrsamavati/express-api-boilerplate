import { Router } from "express";
import CreateProductDTO from "../dto/CreateProductDTO.js";
import { validator } from "../middlewares/dtoValidator.js";
import { createProductHandler } from "../handlers/product/createProduct.js";

const productRouter = Router();

productRouter.post("/create", validator(CreateProductDTO), createProductHandler);

export default productRouter;
