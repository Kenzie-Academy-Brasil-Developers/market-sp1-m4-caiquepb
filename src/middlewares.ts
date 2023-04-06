import { NextFunction, Request, Response } from "express";
import { market } from "./database";
import { TProductRequest } from "./interface";

const checkName = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const productDataArray: Array<TProductRequest> = request.body;

  productDataArray.forEach((product) => {
    market.forEach((marketProduct) => {
      if (product.name === marketProduct.name) {
        return response
          .status(409)
          .json({ error: "Product already registered" });
      }
    });
  });

  return next();
};

const checkNameUpdate = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const productData = request.body;

  market.some((marketProduct) => {
    if (productData.name === marketProduct.name) {
      return response.status(409).json({ error: "Product already registered" });
    }
  });

  return next();
};

const checkId = (
  request: Request,
  response: Response,
  next: NextFunction
): void | Response => {
  const { id } = request.params;
  const productIndex = market.findIndex((product) => product.id === Number(id));

  if (productIndex === -1) {
    return response.status(404).json({ error: "Product not found" });
  }

  return next();
};

export { checkName, checkNameUpdate, checkId };
