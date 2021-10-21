import { use } from "@cubos/inject";

import { api } from "../generated/api";
import type { Client } from "../models";
import { ClientRepository } from "../repositories";

api.fn.getClients = async () => {
  const users = await use(ClientRepository).find();

  return users;
};

api.fn.createClient = async (_ctx, { name, cpf }) => {
  const createdClient = await use(ClientRepository).save({
    cpf,
    name,
  });

  return createdClient;
};
