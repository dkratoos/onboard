import { use } from "@cubos/inject";

import { api } from "../generated/api";
import type { Product } from "../models";
import { ProductRepository } from "../repositories";

api.fn.getProducts = async () => {
  const users = await use(ProductRepository).find();

  return users;
};

api.fn.createProduct = async (_ctx, { name, price }) => {
  const createdProduct = await use(ProductRepository).save({
    price,
    name,
  });

  return createdProduct;
};
