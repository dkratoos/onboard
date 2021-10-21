import { use } from "@cubos/inject";

import { api } from "../generated/api";
import type { User } from "../models";
import { UserRepository } from "../repositories";

function formatUser(user: User) {
  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  };
}

api.fn.getUsers = async () => {
  const users = await use(UserRepository).find();

  return users.map(formatUser);
};

api.fn.createUser = async (_ctx, { name, age }) => {
  const splitName = name.split(" ");

  if (splitName.length !== 2) {
    throw api.err.InvalidArgument(use.tr`Nome inválido`);
  }

  const [firstName, lastName] = splitName;

  const createdUser = await use(UserRepository).save({
    age,
    firstName,
    lastName,
  });

  return formatUser(createdUser);
};
