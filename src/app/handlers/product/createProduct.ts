import { RequestHandler } from "express";
import CreateProductDTO from "../../dto/CreateProductDTO.js";
import OperationResult from "../../../models/OperationResult.js";

type IProduct = {
    id: string;
    name: string;
    price: number;
};

const products: IProduct[] = [];

export const createProductHandler: RequestHandler = async (req, res, next) => {
    const createProductDTO: CreateProductDTO = res.locals.dto;
    
    const result = new OperationResult();

    if(products.some(p => p.id === createProductDTO.id)) return res.json(result.failed("Product ID already exists"));

    products.push({
        id: createProductDTO.id,
        name: createProductDTO.name,
        price: createProductDTO.price
    });

    res.json(result.succeeded("Product added"));
};
