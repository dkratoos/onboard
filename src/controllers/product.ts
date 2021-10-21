import { use } from "@cubos/inject";

import { api } from "../generated/api";
import type { Product } from "../models";
import { ProductRepository } from "../repositories";

api.fn.getProducts = async () => {
  const products = await use(ProductRepository).find();

  return products;
};

api.fn.createProduct = async (_ctx, { name, price }) => {
  const createdProduct = await use(ProductRepository).save({
    price,
    name,
  });

  return createdProduct;
};
