import { Request, Response } from "express";
import { market } from "./database";
import { IProduct, TProductRequest } from "./interface";

const createProduct = (request: Request, response: Response): Response => {
  const productDataArray: Array<TProductRequest> = request.body;
  let id = market.length;

  const newProduct: Array<IProduct> = productDataArray.map((product) => {
    return {
      id: ++id,
      ...product,
      expirationDate: new Date(new Date().setDate(new Date().getDate() + 365)),
    };
  });

  market.push(...newProduct);

  return response.status(201).json({
    total: productDataArray.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    ),
    marketProducts: newProduct,
  });
};

const listProduct = (request: Request, response: Response): Response => {
  return response.status(200).json({
    total: market.reduce(
      (previousValue, currentValue) => previousValue + currentValue.price,
      0
    ),
    marketProducts: market,
  });
};

const getProductById = (request: Request, response: Response): Response => {
  const { id } = request.params;
  const productIndex = market.findIndex((product) => product.id === Number(id));

  return response.status(200).json(market[productIndex]);
};

const updateProduct = (request: Request, response: Response): Response => {
  const { id } = request.params;
  const productIndex = market.findIndex((product) => product.id === Number(id));
  const update = request.body;
  const productUpdate = {
    ...market[productIndex],
    ...update,
  };

  market[productIndex] = productUpdate;

  return response.status(200).json(productUpdate);
};

const deleteProduct = (request: Request, response: Response): Response => {
  const { id } = request.params;
  const productIndex = market.findIndex((product) => product.id === Number(id));

  market.splice(productIndex, 1);

  return response.status(204).json();
};

export {
  createProduct,
  listProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
