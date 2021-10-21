import { use } from "@cubos/inject";

import { api } from "../generated/api";
import type { Order } from "../models";
import { OrderRepository } from "../repositories";

api.fn.getOrders = async () => {
  const users = await use(OrderRepository).find();

  return users;
};

api.fn.createOrder = async (_ctx, { order }) => {
  const newOrder = Object.assign({}, { ...order })

  const createdOrder = await use(OrderRepository).save(newOrder);

  return createdOrder;
};

// api.fn.createOrder = async (_ctx, { name, number, client, products }) => {
//   const createdOrder = await use(OrderRepository).save({ name, number, client, products });

//   return createdOrder;
// };
